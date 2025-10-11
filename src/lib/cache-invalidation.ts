import { getCacheKey, redis } from "./redis";

/**
 * Invalidate cache for a specific note
 */
export async function invalidateNoteCache(slug: string) {
  const cacheKey = getCacheKey.noteBySlug(slug);
  await redis.del(cacheKey);
  console.log(`Invalidated cache for note: ${slug}`);
}

/**
 * Invalidate all notes cache (all variations)
 */
export async function invalidateAllNotesCache() {
  // Get all keys matching the pattern
  const pattern = "notes:all*";
  const keys = await redis.keys(pattern);

  if (keys.length > 0) {
    await redis.del(...keys);
    console.log(`Invalidated ${keys.length} cache keys for all notes`);
  }
}

/**
 * Invalidate cache when a note is created, updated, or deleted
 */
export async function invalidateNoteCacheOnChange(noteSlug: string) {
  // Invalidate specific note
  await invalidateNoteCache(noteSlug);

  // Invalidate all notes lists (since they might include this note)
  await invalidateAllNotesCache();

  console.log(`Full cache invalidation completed for note: ${noteSlug}`);
}

/**
 * Clear all cache (use with caution)
 */
export async function clearAllCache() {
  const keys = await redis.keys("*");

  if (keys.length > 0) {
    await redis.del(...keys);
    console.log(`Cleared ${keys.length} cache keys`);
  }
}
