import { env } from "@/env";
import { CACHE_DURATION, getCacheKey, redis } from "@/lib/redis";
import { Class, Subject } from "@/lib/type";
import { db } from "@/server/db";
import { note } from "@/server/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const classParam = searchParams.get("class") as Class | null;
  const subjectParam = searchParams.get("subject") as Subject | null;

  try {
    const cacheKey = getCacheKey.allNotes(
      classParam || undefined,
      subjectParam || undefined
    );

    if (env.NODE_ENV !== "development") {
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        console.log(`Cache hit for all notes: ${cacheKey}`);
        return NextResponse.json(cachedData, {
          status: 200,
          headers: {
            "X-Cache": "HIT",
          },
        });
      }
    }

    // Fetch from database
    const whereConditions = [eq(note.isPublished, true)];

    if (classParam) {
      whereConditions.push(eq(note.class, classParam));
    }

    if (subjectParam) {
      whereConditions.push(eq(note.subject, subjectParam));
    }

    const noteData = await db.query.note.findMany({
      where: and(...whereConditions),
      orderBy: desc(note.createdAt),
      columns: {
        id: true,
        title: true,
        slug: true,
        content: true,
        class: true,
        subject: true,
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

    const response = { notes: noteData };

    if (env.NODE_ENV !== "development") {
      // Cache the response
      await redis.set(cacheKey, response, {
        ex: CACHE_DURATION,
      });
    }

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
