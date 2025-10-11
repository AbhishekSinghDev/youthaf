import { CACHE_DURATION, getCacheKey, redis } from "@/lib/redis";
import { db } from "@/server/db";
import { note } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    // Check cache first
    const cacheKey = getCacheKey.noteBySlug(slug);
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log(`Cache hit for note: ${slug}`);
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          "X-Cache": "HIT",
        },
      });
    }

    console.log(`Cache miss for note: ${slug}`);

    // Fetch from database
    const noteData = await db.query.note.findFirst({
      where: eq(note.slug, slug),
      columns: {
        id: true,
        title: true,
        slug: true,
        content: true,
        thumbnailKey: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        attachments: {
          columns: {
            id: true,
            fileKey: true,
          },
        },
      },
    });

    if (!noteData?.isPublished) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    const response = { note: noteData };

    // Cache the result for 1 month
    await redis.setex(cacheKey, CACHE_DURATION, response);

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Error in GET /api/note:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
