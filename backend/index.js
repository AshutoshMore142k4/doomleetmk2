import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { Redis } from '@upstash/redis';
import { seedCache } from './cache-seeder.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Redis Client ────────────────────────────────────────────
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ─── Middleware ──────────────────────────────────────────────
app.use(helmet()); // Basic security headers
app.use(compression()); // Gzip/Brotli response compression
app.use(cors());
app.use(express.json());

// ─── Rate Limiting ───────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiter to all api routes
app.use('/api/', limiter);

// ─── Cache Config ───────────────────────────────────────────
const CACHE_KEYS = {
  problems:      'page:problems',
  striver:       'page:striver',
  templates:     'page:templates',
  cheatsheet:    'page:cheatsheet',
  systemDesign:  'page:system-design',
  comparison:    'page:comparison',
  mapper:        'page:mapper',
};

const CACHE_TTL = 60 * 60 * 24; // 24 hours

// ─── Generic Cache-First Handler ────────────────────────────
async function serveCached(req, res, cacheKey) {
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      res.set('X-Cache', 'HIT');
      res.set('X-Instance', String(PORT));
      return res.json(cached);
    }

    // Cache miss — trigger a re-seed for this key
    res.set('X-Cache', 'MISS');
    res.set('X-Instance', String(PORT));
    return res.status(503).json({
      error: 'Cache not warmed yet. Run: node cache-seeder.js',
      key: cacheKey,
    });
  } catch (error) {
    console.error(`[Redis] Error serving ${cacheKey}:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ─── Health Check ───────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const ping = await redis.ping();
    res.json({
      status: 'ok',
      redis: ping,
      instance: PORT,
      timestamp: new Date().toISOString(),
      cachedPages: Object.keys(CACHE_KEYS),
    });
  } catch (error) {
    res.status(500).json({ status: 'error', redis: 'disconnected', error: error.message });
  }
});

// ─── Page Data Endpoints ────────────────────────────────────
app.get('/api/data/problems', (req, res) => serveCached(req, res, CACHE_KEYS.problems));
app.get('/api/data/striver', (req, res) => serveCached(req, res, CACHE_KEYS.striver));
app.get('/api/data/templates', (req, res) => serveCached(req, res, CACHE_KEYS.templates));
app.get('/api/data/cheatsheet', (req, res) => serveCached(req, res, CACHE_KEYS.cheatsheet));
app.get('/api/data/system-design', (req, res) => serveCached(req, res, CACHE_KEYS.systemDesign));
app.get('/api/data/comparison', (req, res) => serveCached(req, res, CACHE_KEYS.comparison));
app.get('/api/data/mapper', (req, res) => serveCached(req, res, CACHE_KEYS.mapper));

// ─── Analytics ──────────────────────────────────────────────
app.post('/api/analytics/pageview', async (req, res) => {
  try {
    const { page } = req.body;
    if (!page) return res.status(400).json({ error: 'page is required' });

    // Atomic increment — never blocks
    const [views, unique] = await Promise.all([
      redis.incr(`analytics:views:${page}`),
      redis.pfadd(`analytics:unique:${page}`, req.ip || 'unknown'),
    ]);

    res.json({ page, views, uniqueEstimate: unique });
  } catch (error) {
    console.error('[Analytics]', error.message);
    res.status(500).json({ error: 'Failed to track pageview' });
  }
});

app.get('/api/analytics/stats', async (req, res) => {
  try {
    const pages = ['home', 'problems', 'striver', 'templates', 'cheatsheet', 'system-design', 'mapper', 'compare'];
    const pipeline = redis.pipeline();

    for (const page of pages) {
      pipeline.get(`analytics:views:${page}`);
      pipeline.pfcount(`analytics:unique:${page}`);
    }

    const results = await pipeline.exec();
    const stats = {};
    pages.forEach((page, i) => {
      stats[page] = {
        views: results[i * 2] || 0,
        uniqueVisitors: results[i * 2 + 1] || 0,
      };
    });

    res.json({ stats, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Cache Management ───────────────────────────────────────
app.post('/api/cache/seed', async (req, res) => {
  try {
    const result = await seedCache(redis, CACHE_TTL);
    res.json({ message: 'Cache seeded successfully', ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/cache/invalidate', async (req, res) => {
  try {
    const { key } = req.body;
    if (key && CACHE_KEYS[key]) {
      await redis.del(CACHE_KEYS[key]);
      res.json({ message: `Cache cleared for ${key}` });
    } else {
      // Clear all page caches
      const pipeline = redis.pipeline();
      Object.values(CACHE_KEYS).forEach(k => pipeline.del(k));
      await pipeline.exec();
      res.json({ message: 'All page caches cleared' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Start Server ───────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`\n  🚀 GrindSDE Backend running on port ${PORT}`);
  console.log(`  📦 Redis-cached pages: ${Object.keys(CACHE_KEYS).length}`);
  console.log(`  ⏱  Cache TTL: ${CACHE_TTL / 3600}h\n`);

  // Auto-seed cache on startup
  try {
    const firstKey = await redis.get(CACHE_KEYS.problems);
    if (!firstKey) {
      console.log('  🌱 Cache is cold — seeding now...');
      const result = await seedCache(redis, CACHE_TTL);
      console.log(`  ✅ Cache seeded: ${result.keysSeeded} keys, ${result.totalSize}\n`);
    } else {
      console.log('  ✅ Cache is warm — ready to serve\n');
    }
  } catch (err) {
    console.error('  ⚠️  Failed to auto-seed cache:', err.message, '\n');
  }
});
