import { env } from "@/env";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

// Cache duration: 1 month in seconds
export const CACHE_DURATION = 60 * 60 * 24 * 30; // 30 days

// Cache key generators
export const getCacheKey = {
  noteBySlug: (slug: string) => `note:slug:${slug}`,
  allNotes: (classParam?: string, subjectParam?: string) => {
    const parts = ["notes:all"];
    if (classParam) parts.push(`class:${classParam}`);
    if (subjectParam) parts.push(`subject:${subjectParam}`);
    return parts.join(":");
  },
};
