/**
 * Cache Seeder — Loads all static page data into Redis for instant serving.
 *
 * Strategy: Read the raw TypeScript data files, extract the data arrays by
 * finding balanced brackets after the `export const NAME = ` declaration,
 * and store the raw JS/TS source string in Redis. The frontend parses it
 * via the backend API which returns it as-is (the data is valid JSON-like
 * JS that the client can evaluate or use with a proper parser).
 *
 * For maximum reliability, we actually just store the ENTIRE file content
 * and let the backend serve it. The client-side already knows how to
 * import this data shape.
 *
 * Can be run:
 *   - Standalone:         node cache-seeder.js
 *   - On server startup:  auto-called from index.js
 *   - Via API:            POST /api/cache/seed
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LIB_DIR = join(__dirname, '..', 'src', 'lib');

/**
 * Reads a TS data file and extracts the main exported array/object as a string.
 */
function extractExportedData(filename, exportName) {
  const filepath = join(LIB_DIR, filename);
  const raw = readFileSync(filepath, 'utf-8');

  // Find the export declaration
  const regex = new RegExp(
    `export\\s+const\\s+${exportName}[^=]*=\\s*`
  );
  const match = raw.match(regex);
  if (!match) {
    throw new Error(`Could not find "export const ${exportName}" in ${filename}`);
  }

  const startIdx = match.index + match[0].length;
  const firstChar = raw[startIdx];

  if (firstChar !== '[' && firstChar !== '{') {
    throw new Error(`Expected [ or { after export in ${filename}, got: ${firstChar}`);
  }

  const openBracket = firstChar;
  const closeBracket = firstChar === '[' ? ']' : '}';

  let depth = 0;
  let endIdx = startIdx;
  let inString = false;
  let stringChar = '';
  let inTemplate = false;
  let templateDepth = 0;

  for (let i = startIdx; i < raw.length; i++) {
    const ch = raw[i];
    const prev = i > 0 ? raw[i - 1] : '';

    // Handle template literals
    if (ch === '`' && prev !== '\\') {
      inTemplate = !inTemplate;
      if (inTemplate) templateDepth++;
      else templateDepth = Math.max(0, templateDepth - 1);
      continue;
    }

    if (inTemplate) continue;

    // Handle regular strings
    if ((ch === '"' || ch === "'") && prev !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = ch;
      } else if (ch === stringChar) {
        inString = false;
      }
      continue;
    }

    if (inString) continue;

    // Count brackets
    if (ch === openBracket) depth++;
    else if (ch === closeBracket) {
      depth--;
      if (depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }

  return raw.substring(startIdx, endIdx);
}

/**
 * Seed all page data into Redis.
 * @param {import('@upstash/redis').Redis} redis
 * @param {number} ttl - TTL in seconds
 */
export async function seedCache(redis, ttl = 86400) {
  const start = Date.now();
  const results = {};

  // Map of cache keys → { file, exportName }
  const dataMap = {
    'page:problems':       { file: 'problems-data.ts',       exportName: 'problemsData' },
    'page:striver':        { file: 'strivers-sde-data.ts',    exportName: 'striverTopics' },
    'page:templates':      { file: 'templates-data.ts',       exportName: 'templatesData' },
    'page:cheatsheet':     { file: 'cheatsheet-data.ts',      exportName: 'cheatSheetSections' },
    'page:system-design':  { file: 'system-design-data.ts',   exportName: 'systemDesignSections' },
    'page:comparison':     { file: 'comparison-data.ts',      exportName: 'comparisonGroups' },
    'page:mapper':         { file: 'problem-mapper-data.ts',  exportName: 'problemMappings' },
  };

  let totalBytes = 0;
  let keysSeeded = 0;

  const pipeline = redis.pipeline();

  for (const [cacheKey, { file, exportName }] of Object.entries(dataMap)) {
    try {
      const dataStr = extractExportedData(file, exportName);
      const sizeKB = (Buffer.byteLength(dataStr, 'utf-8') / 1024).toFixed(1);
      totalBytes += Buffer.byteLength(dataStr, 'utf-8');

      pipeline.set(cacheKey, dataStr, { ex: ttl });
      keysSeeded++;

      results[cacheKey] = { file, size: `${sizeKB}KB`, status: 'seeded' };
      console.log(`  📦 ${cacheKey} → ${sizeKB}KB from ${file}`);

    } catch (err) {
      console.error(`  ❌ Failed to seed ${cacheKey}:`, err.message);
      results[cacheKey] = { file, status: 'error', error: err.message };
    }
  }

  await pipeline.exec();

  const elapsed = Date.now() - start;
  const totalSize = `${(totalBytes / 1024).toFixed(0)}KB`;

  console.log(`\n  ⚡ Cache seeded in ${elapsed}ms — ${keysSeeded} keys, ${totalSize} total`);

  return { keysSeeded, totalSize, elapsed: `${elapsed}ms`, details: results };
}

// ─── Standalone execution ───────────────────────────────────
const isMain = process.argv[1]?.includes('cache-seeder');
if (isMain) {
  (async () => {
    const { default: dotenv } = await import('dotenv');
    dotenv.config();

    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    console.log('\n  🌱 GrindSDE Cache Seeder\n');
    const result = await seedCache(redis);
    console.log('\n  Done:', JSON.stringify(result, null, 2));
    process.exit(0);
  })();
}
