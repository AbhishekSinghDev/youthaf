import { db } from "@/server/db";
import { note } from "@/server/db/schema";
import { requireAdmin } from "@/server/helper";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const { id, isPublished } = await request.json();

    if (!id || typeof isPublished !== "boolean") {
      return NextResponse.json(
        { message: "Invalid request data", status: "error" },
        { status: 400 }
      );
    }

    await db
      .update(note)
      .set({
        isPublished,
        updatedAt: new Date(),
      })
      .where(eq(note.id, id));

    return NextResponse.json(
      {
        message: `Note ${
          isPublished ? "published" : "unpublished"
        } successfully`,
        status: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating note publish status:", error);
    return NextResponse.json(
      { message: "Failed to update note", status: "error" },
      { status: 500 }
    );
  }
}
