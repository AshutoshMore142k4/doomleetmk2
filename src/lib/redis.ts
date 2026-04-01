import { Redis } from '@upstash/redis';

/**
 * Upstash Redis client initialized with environment variables.
 * For Vite SPA, variables must be prefixed with VITE_.
 */
export const redis = new Redis({
  url: import.meta.env.VITE_UPSTASH_REDIS_REST_URL,
  token: import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN,
});

/**
 * Sample Redis service for testing/demonstration.
 */
export const redisService = {
  /**
   * Increments a key (e.g. view counter).
   */
  async incrementView(page: string) {
    try {
      const resp = await redis.incr(`views:${page}`);
      return resp;
    } catch (error) {
      console.error('Redis error:', error);
      return null;
    }
  },

  /**
   * Sets a value in Redis.
   */
  async set(key: string, value: any) {
    try {
      return await redis.set(key, value);
    } catch (error) {
      console.error('Redis error:', error);
      return null;
    }
  },

  /**
   * Gets a value from Redis.
   */
  async get(key: string) {
    try {
      return await redis.get(key);
    } catch (error) {
      console.error('Redis error:', error);
      return null;
    }
  }
};
