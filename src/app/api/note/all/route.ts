import { db } from "@/server/db";
import { note } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const noteData = await db.query.note.findMany({
      where: eq(note.isPublished, true),
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

    return NextResponse.json({ notes: noteData }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/note:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
