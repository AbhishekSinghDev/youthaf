import { db } from "@/server/db";
import { course, note, user } from "@/server/db/schema";
import { requireAdmin } from "@/server/helper";
import { count, desc, eq, sum } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAdmin();

    // Total users count
    const totalUsers = await db
      .select({ count: count() })
      .from(user)
      .then((res) => res[0]?.count || 0);

    // Total courses count
    const totalCourses = await db
      .select({ count: count() })
      .from(course)
      .then((res) => res[0]?.count || 0);

    // Published courses count
    const publishedCourses = await db
      .select({ count: count() })
      .from(course)
      .where(eq(course.status, "published"))
      .then((res) => res[0]?.count || 0);

    // Total notes count
    const totalNotes = await db
      .select({ count: count() })
      .from(note)
      .then((res) => res[0]?.count || 0);

    // Published notes count
    const publishedNotes = await db
      .select({ count: count() })
      .from(note)
      .where(eq(note.isPublished, true))
      .then((res) => res[0]?.count || 0);

    // Total note views
    const totalViews = await db
      .select({ total: sum(note.views) })
      .from(note)
      .then((res) => res[0]?.total || "0");

    // Recent users
    const recentUsers = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })
      .from(user)
      .orderBy(desc(user.createdAt))
      .limit(5);

    // Recent notes
    const recentNotes = await db
      .select({
        id: note.id,
        title: note.title,
        class: note.class,
        subject: note.subject,
        views: note.views,
        isPublished: note.isPublished,
        createdAt: note.createdAt,
      })
      .from(note)
      .orderBy(desc(note.createdAt))
      .limit(5);

    // Notes by class distribution
    const notesByClass = await db
      .select({
        class: note.class,
        count: count(),
      })
      .from(note)
      .groupBy(note.class);

    // Notes by subject distribution
    const notesBySubject = await db
      .select({
        subject: note.subject,
        count: count(),
      })
      .from(note)
      .groupBy(note.subject);

    return NextResponse.json(
      {
        stats: {
          totalUsers,
          totalCourses,
          publishedCourses,
          totalNotes,
          publishedNotes,
          totalViews: parseInt(totalViews),
        },
        recentUsers,
        recentNotes,
        notesByClass,
        notesBySubject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { message: "Failed to fetch admin statistics", status: "error" },
      { status: 500 }
    );
  }
}
