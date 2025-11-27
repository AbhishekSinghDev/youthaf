import {
  invalidateAllNotesCache,
  invalidateNoteCache,
} from "@/lib/cache-invalidation";
import { db } from "@/server/db";
import { note, noteAttachments } from "@/server/db/schema";
import { requireAdmin } from "@/server/helper";
import { inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import z4 from "zod/v4";

const BulkDeleteSchema = z4.object({
  ids: z4.array(z4.string().min(1)).min(1, "At least one ID is required"),
});

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const validation = BulkDeleteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid request data", issues: validation.error.issues },
        { status: 400 }
      );
    }

    const { ids } = validation.data;

    // Get slugs for cache invalidation before deleting
    const notesToDelete = await db.query.note.findMany({
      where: inArray(note.id, ids),
      columns: { slug: true },
    });

    // Delete attachments first (due to foreign key constraints)
    await db
      .delete(noteAttachments)
      .where(inArray(noteAttachments.noteId, ids));

    // Then delete the notes
    await db.delete(note).where(inArray(note.id, ids));

    // Invalidate cache for all deleted notes
    await Promise.all([
      ...notesToDelete.map((n) => invalidateNoteCache(n.slug)),
      invalidateAllNotesCache(),
    ]);

    return NextResponse.json(
      {
        message: `Successfully deleted ${ids.length} note(s)`,
        status: "success",
        deletedCount: ids.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error bulk deleting notes:", error);
    return NextResponse.json(
      { message: "Failed to delete notes", status: "error" },
      { status: 500 }
    );
  }
}
