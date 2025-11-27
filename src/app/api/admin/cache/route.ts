import {
  clearAllCache,
  invalidateAllNotesCache,
} from "@/lib/cache-invalidation";
import { requireAdmin } from "@/server/helper";
import { NextRequest, NextResponse } from "next/server";
import z4 from "zod/v4";

const CacheActionSchema = z4.object({
  action: z4.enum(["clear-all", "clear-notes"]),
});

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const validation = CacheActionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid request data", issues: validation.error.issues },
        { status: 400 }
      );
    }

    const { action } = validation.data;

    if (action === "clear-all") {
      await clearAllCache();
      return NextResponse.json(
        {
          message: "All cache cleared successfully",
          status: "success",
        },
        { status: 200 }
      );
    }

    if (action === "clear-notes") {
      await invalidateAllNotesCache();
      return NextResponse.json(
        {
          message: "Notes cache cleared successfully",
          status: "success",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Invalid action", status: "error" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error clearing cache:", error);
    return NextResponse.json(
      { message: "Failed to clear cache", status: "error" },
      { status: 500 }
    );
  }
}
