"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminStats, fetchAdminStats } from "@/lib/functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Eye,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import { Suspense } from "react";

// Stats Card Component
const StatsCard = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  subtitle?: string;
  trend?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
      {trend && (
        <div className="flex items-center text-xs text-green-600 mt-2">
          <TrendingUp className="h-3 w-3 mr-1" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
);

// Recent Users Table
const RecentUsersTable = ({ users }: { users: AdminStats["recentUsers"] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Users</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b pb-3 last:border-0"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="text-right space-y-1">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 capitalize">
                {user.role}
              </span>
              <p className="text-xs text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Recent Notes Table
const RecentNotesTable = ({ notes }: { notes: AdminStats["recentNotes"] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Notes</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-center justify-between border-b pb-3 last:border-0"
          >
            <div className="space-y-1 flex-1">
              <p className="text-sm font-medium line-clamp-1">{note.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground capitalize">
                  {note.class.replaceAll("_", " ")}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {note.subject.replaceAll("_", " ")}
                </span>
              </div>
            </div>
            <div className="text-right space-y-1 ml-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                {note.views}
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  note.isPublished
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                {note.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Distribution Cards
const DistributionCard = ({
  title,
  data,
  icon: Icon,
}: {
  title: string;
  data: Array<{ [key: string]: any; count: number }>;
  icon: React.ElementType;
}) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => {
            const key = Object.keys(item).find((k) => k !== "count") || "";
            const percentage = total > 0 ? (item.count / total) * 100 : 0;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize">
                    {item[key].replaceAll("_", " ")}
                  </span>
                  <span className="font-medium">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const DashboardContent = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchAdminStats,
  });

  const { stats, recentUsers, recentNotes, notesByClass, notesBySubject } =
    data;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          subtitle="Registered accounts"
        />
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={BookOpen}
          subtitle={`${stats.publishedCourses} published`}
        />
        <StatsCard
          title="Total Notes"
          value={stats.totalNotes}
          icon={FileText}
          subtitle={`${stats.publishedNotes} published`}
        />
        <StatsCard
          title="Total Views"
          value={stats.totalViews}
          icon={Eye}
          subtitle="Across all notes"
        />
        <StatsCard
          title="Published Courses"
          value={stats.publishedCourses}
          icon={BookOpen}
          subtitle={`${stats.totalCourses - stats.publishedCourses} drafts`}
        />
        <StatsCard
          title="Published Notes"
          value={stats.publishedNotes}
          icon={FileText}
          subtitle={`${stats.totalNotes - stats.publishedNotes} drafts`}
        />
      </div>

      {/* Distribution Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <DistributionCard
          title="Notes by Class"
          data={notesByClass}
          icon={GraduationCap}
        />
        <DistributionCard
          title="Notes by Subject"
          data={notesBySubject}
          icon={BookOpen}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentUsersTable users={recentUsers} />
        <RecentNotesTable notes={recentNotes} />
      </div>
    </div>
  );
};

// Loading Skeleton
const DashboardSkeleton = () => (
  <div className="p-6 space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96" />
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Suspense Wrapper
const DashboardContentSuspense = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
};

export default DashboardContentSuspense;
