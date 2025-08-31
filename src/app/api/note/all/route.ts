import { Class, Subject } from "@/lib/type";
import { db } from "@/server/db";
import { note } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const classParam = searchParams.get("class") as Class | null;
  const subjectParam = searchParams.get("subject") as Subject | null;

  try {
    const whereConditions = [eq(note.isPublished, true)];

    if (classParam) {
      whereConditions.push(eq(note.class, classParam));
    }

    if (subjectParam) {
      whereConditions.push(eq(note.subject, subjectParam));
    }

    const noteData = await db.query.note.findMany({
      where: and(...whereConditions),
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
