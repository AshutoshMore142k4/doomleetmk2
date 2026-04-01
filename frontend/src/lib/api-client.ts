/**
 * API Client — Fetches page data from the Redis-backed backend.
 *
 * On production (Digital Ocean), requests go through Nginx load balancer
 * to one of the PM2 backend instances, which serve from Redis cache.
 *
 * Flow:  Client → Nginx (LB) → PM2 instance → Redis (2ms) → Response
 * vs old: Client → Download 570KB JS bundle → Parse → Render
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

interface CacheResponse<T> {
  data: T;
  cached: boolean;
  instance: string;
}

async function fetchFromCache<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/data/${endpoint}`);
    if (!response.ok) return null;

    const cacheStatus = response.headers.get('X-Cache');
    const instance = response.headers.get('X-Instance');

    if (cacheStatus) {
      console.log(`[API] ${endpoint} — Cache: ${cacheStatus}, Instance: ${instance}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[API] Failed to fetch ${endpoint} from backend, using local data`);
    return null;
  }
}

export const apiClient = {
  /**
   * Health check — verify which backend instance is responding.
   */
  async getHealth() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/health`);
      return await response.json();
    } catch (error) {
      console.error('Backend health check failed:', error);
      return null;
    }
  },

  /**
   * Fetch problems data from Redis cache.
   */
  async getProblems() {
    return fetchFromCache('problems');
  },

  /**
   * Fetch Striver's SDE Sheet data from Redis cache.
   */
  async getStriver() {
    return fetchFromCache('striver');
  },

  /**
   * Fetch algorithm templates from Redis cache.
   */
  async getTemplates() {
    return fetchFromCache('templates');
  },

  /**
   * Fetch cheatsheet data from Redis cache.
   */
  async getCheatsheet() {
    return fetchFromCache('cheatsheet');
  },

  /**
   * Fetch system design data from Redis cache.
   */
  async getSystemDesign() {
    return fetchFromCache('system-design');
  },

  /**
   * Fetch comparison data from Redis cache.
   */
  async getComparison() {
    return fetchFromCache('comparison');
  },

  /**
   * Fetch problem mapper data from Redis cache.
   */
  async getMapper() {
    return fetchFromCache('mapper');
  },

  /**
   * Track a page view. Uses Redis INCR + HyperLogLog for unique visitors.
   */
  async trackPageView(page: string) {
    try {
      await fetch(`${BACKEND_URL}/api/analytics/pageview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page }),
      });
    } catch {
      // Silent fail — analytics should never break UX
    }
  },

  /**
   * Get aggregate analytics stats.
   */
  async getAnalytics() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/analytics/stats`);
      return await response.json();
    } catch {
      return null;
    }
  },
};
