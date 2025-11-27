import { db } from "@/server/db";
import { course, note, user } from "@/server/db/schema";
import { requireAdmin } from "@/server/helper";
import { count, desc, eq, gte, sql, sum } from "drizzle-orm";
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

    // Draft notes count
    const draftNotes = await db
      .select({ count: count() })
      .from(note)
      .where(eq(note.isPublished, false))
      .then((res) => res[0]?.count || 0);

    // Total note views
    const totalViews = await db
      .select({ total: sum(note.views) })
      .from(note)
      .then((res) => res[0]?.total || "0");

    // Notes created in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const notesLast7Days = await db
      .select({ count: count() })
      .from(note)
      .where(gte(note.createdAt, sevenDaysAgo))
      .then((res) => res[0]?.count || 0);

    // Notes created in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const notesLast30Days = await db
      .select({ count: count() })
      .from(note)
      .where(gte(note.createdAt, thirtyDaysAgo))
      .then((res) => res[0]?.count || 0);

    // Users created in last 7 days
    const usersLast7Days = await db
      .select({ count: count() })
      .from(user)
      .where(gte(user.createdAt, sevenDaysAgo))
      .then((res) => res[0]?.count || 0);

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

    // Recent notes (including slug for linking)
    const recentNotes = await db
      .select({
        id: note.id,
        title: note.title,
        slug: note.slug,
        class: note.class,
        subject: note.subject,
        views: note.views,
        isPublished: note.isPublished,
        createdAt: note.createdAt,
      })
      .from(note)
      .orderBy(desc(note.createdAt))
      .limit(5);

    // Recent draft notes (for quick publish feature)
    const recentDrafts = await db
      .select({
        id: note.id,
        title: note.title,
        slug: note.slug,
        class: note.class,
        subject: note.subject,
        createdAt: note.createdAt,
      })
      .from(note)
      .where(eq(note.isPublished, false))
      .orderBy(desc(note.createdAt))
      .limit(5);

    // Top viewed notes
    const topViewedNotes = await db
      .select({
        id: note.id,
        title: note.title,
        slug: note.slug,
        views: note.views,
        class: note.class,
        subject: note.subject,
      })
      .from(note)
      .where(eq(note.isPublished, true))
      .orderBy(desc(note.views))
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

    // Notes created per day for last 7 days (for line chart)
    const notesPerDay = await db
      .select({
        date: sql<string>`DATE(${note.createdAt})`.as("date"),
        count: count(),
      })
      .from(note)
      .where(gte(note.createdAt, sevenDaysAgo))
      .groupBy(sql`DATE(${note.createdAt})`)
      .orderBy(sql`DATE(${note.createdAt})`);

    // Publish status distribution (for pie chart)
    const publishStatusDistribution = [
      { status: "Published", count: publishedNotes },
      { status: "Draft", count: draftNotes },
    ];

    return NextResponse.json(
      {
        stats: {
          totalUsers,
          totalCourses,
          publishedCourses,
          totalNotes,
          publishedNotes,
          draftNotes,
          totalViews: parseInt(totalViews),
          notesLast7Days,
          notesLast30Days,
          usersLast7Days,
        },
        recentUsers,
        recentNotes,
        recentDrafts,
        topViewedNotes,
        notesByClass,
        notesBySubject,
        notesPerDay,
        publishStatusDistribution,
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
