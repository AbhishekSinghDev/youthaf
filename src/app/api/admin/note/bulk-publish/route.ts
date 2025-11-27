import {
  invalidateAllNotesCache,
  invalidateNoteCache,
} from "@/lib/cache-invalidation";
import { db } from "@/server/db";
import { note } from "@/server/db/schema";
import { requireAdmin } from "@/server/helper";
import { inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import z4 from "zod/v4";

const BulkPublishSchema = z4.object({
  ids: z4.array(z4.string().min(1)).min(1, "At least one ID is required"),
  isPublished: z4.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const validation = BulkPublishSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid request data", issues: validation.error.issues },
        { status: 400 }
      );
    }

    const { ids, isPublished } = validation.data;

    // Get slugs for cache invalidation
    const notesToUpdate = await db.query.note.findMany({
      where: inArray(note.id, ids),
      columns: { slug: true },
    });

    await db
      .update(note)
      .set({
        isPublished,
        updatedAt: new Date(),
      })
      .where(inArray(note.id, ids));

    // Invalidate cache for all updated notes
    await Promise.all([
      ...notesToUpdate.map((n) => invalidateNoteCache(n.slug)),
      invalidateAllNotesCache(),
    ]);

    return NextResponse.json(
      {
        message: `Successfully ${isPublished ? "published" : "unpublished"} ${
          ids.length
        } note(s)`,
        status: "success",
        updatedCount: ids.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error bulk updating notes:", error);
    return NextResponse.json(
      { message: "Failed to update notes", status: "error" },
      { status: 500 }
    );
  }
}
