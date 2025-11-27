"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminStats, fetchAdminStats } from "@/lib/functions";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  BookOpen,
  Edit,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
  Plus,
  RefreshCw,
  Trash2,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// Chart Colors - using direct oklch values from globals.css
const CHART_COLORS = {
  chart1: "oklch(0.5417 0.179 288.0332)",
  chart2: "oklch(0.7042 0.1602 288.988)",
  chart3: "oklch(0.5679 0.2113 276.7065)",
  chart4: "oklch(0.6356 0.1922 281.8054)",
  chart5: "oklch(0.4509 0.1758 279.3838)",
};

const COLORS_ARRAY = [
  CHART_COLORS.chart1,
  CHART_COLORS.chart2,
  CHART_COLORS.chart3,
  CHART_COLORS.chart4,
  CHART_COLORS.chart5,
];

// Stats Card Component
const StatsCard = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
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
      {trendValue && (
        <div
          className={`flex items-center text-xs mt-2 ${
            trend === "up"
              ? "text-green-600"
              : trend === "down"
              ? "text-red-600"
              : "text-muted-foreground"
          }`}
        >
          {trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
          {trendValue}
        </div>
      )}
    </CardContent>
  </Card>
);

// Notes Activity Chart (Area Chart)
const NotesActivityChart = ({ data }: { data: AdminStats["notesPerDay"] }) => {
  const chartConfig = {
    count: {
      label: "Notes Created",
      color: CHART_COLORS.chart1,
    },
  } satisfies ChartConfig;

  // Fill missing days with 0
  const filledData = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const existing = data.find((d) => d.date === dateStr);
    filledData.push({
      date: dateStr,
      count: existing?.count || 0,
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Notes Activity
        </CardTitle>
        <CardDescription>Notes created in the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={filledData}>
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={CHART_COLORS.chart1}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={CHART_COLORS.chart1}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke={CHART_COLORS.chart1}
              fill="url(#fillCount)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// Publish Status Pie Chart
const PublishStatusChart = ({
  data,
}: {
  data: AdminStats["publishStatusDistribution"];
}) => {
  const chartConfig = {
    Published: {
      label: "Published",
      color: CHART_COLORS.chart2,
    },
    Draft: {
      label: "Draft",
      color: CHART_COLORS.chart4,
    },
  } satisfies ChartConfig;

  const chartData = data.map((item, index) => ({
    ...item,
    fill: index === 0 ? CHART_COLORS.chart2 : CHART_COLORS.chart4,
  }));

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Publish Status
        </CardTitle>
        <CardDescription>
          Distribution of published vs draft notes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
        <div className="text-center mt-2">
          <span className="text-2xl font-bold">{total}</span>
          <span className="text-muted-foreground text-sm ml-1">
            Total Notes
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// Notes by Class Bar Chart
const NotesByClassChart = ({ data }: { data: AdminStats["notesByClass"] }) => {
  const chartConfig = data.reduce((acc, item, index) => {
    acc[item.class] = {
      label: item.class
        .replace("_", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      color: COLORS_ARRAY[index % COLORS_ARRAY.length],
    };
    return acc;
  }, {} as ChartConfig);

  const chartData = data.map((item, index) => ({
    ...item,
    label: item.class
      .replace("_", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    fill: COLORS_ARRAY[index % COLORS_ARRAY.length],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Notes by Class
        </CardTitle>
        <CardDescription>Distribution across different classes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              width={80}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// Notes by Subject Bar Chart
const NotesBySubjectChart = ({
  data,
}: {
  data: AdminStats["notesBySubject"];
}) => {
  const chartConfig = data.reduce((acc, item, index) => {
    acc[item.subject] = {
      label: item.subject
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      color: COLORS_ARRAY[index % COLORS_ARRAY.length],
    };
    return acc;
  }, {} as ChartConfig);

  const chartData = data.map((item, index) => ({
    ...item,
    label: item.subject
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    fill: COLORS_ARRAY[index % COLORS_ARRAY.length],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Notes by Subject
        </CardTitle>
        <CardDescription>
          Distribution across different subjects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// Quick Actions Card
const QuickActionsCard = () => {
  const queryClient = useQueryClient();

  const { mutate: clearCache, isPending: isClearingCache } = useMutation({
    mutationFn: async (action: "clear-all" | "clear-notes") => {
      const response = await fetch("/api/admin/cache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!response.ok) throw new Error("Failed to clear cache");
      return response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: () => {
      toast.error("Failed to clear cache");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild className="w-full justify-start">
          <Link href="/admin/notes/create">
            <Plus className="h-4 w-4 mr-2" />
            Create New Note
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/admin/notes">
            <FileText className="h-4 w-4 mr-2" />
            Manage All Notes
          </Link>
        </Button>
        <div className="border-t pt-3 mt-3">
          <p className="text-sm text-muted-foreground mb-2">Cache Management</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => clearCache("clear-notes")}
              disabled={isClearingCache}
              className="flex-1"
            >
              <RefreshCw
                className={`h-4 w-4 mr-1 ${
                  isClearingCache ? "animate-spin" : ""
                }`}
              />
              Clear Notes
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => clearCache("clear-all")}
              disabled={isClearingCache}
              className="flex-1"
            >
              <Trash2
                className={`h-4 w-4 mr-1 ${
                  isClearingCache ? "animate-spin" : ""
                }`}
              />
              Clear All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Recent Drafts Card (for quick publish)
const RecentDraftsCard = ({
  drafts,
}: {
  drafts: AdminStats["recentDrafts"];
}) => {
  const queryClient = useQueryClient();

  const { mutate: publishNote, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch("/api/admin/note/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isPublished: true }),
      });
      if (!response.ok) throw new Error("Failed to publish note");
      return response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: () => {
      toast.error("Failed to publish note");
    },
  });

  if (drafts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Drafts
          </CardTitle>
          <CardDescription>Unpublished notes ready for review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No drafts available</p>
            <p className="text-xs">All notes are published!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Recent Drafts
        </CardTitle>
        <CardDescription>Unpublished notes ready for review</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{draft.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {draft.class.replace("_", " ")}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {draft.subject.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                  <Link href={`/admin/notes/${draft.slug}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => publishNote(draft.id)}
                  disabled={isPending}
                >
                  Publish
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Top Viewed Notes Card
const TopViewedNotesCard = ({
  notes,
}: {
  notes: AdminStats["topViewedNotes"];
}) => {
  if (notes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Top Viewed Notes
          </CardTitle>
          <CardDescription>Most popular published notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No published notes yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Top Viewed Notes
        </CardTitle>
        <CardDescription>Most popular published notes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notes.map((note, index) => (
            <div
              key={note.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{note.title}</p>
                <p className="text-xs text-muted-foreground">
                  {note.class.replace("_", " ")} •{" "}
                  {note.subject.replace(/_/g, " ")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-muted-foreground">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    {parseInt(note.views).toLocaleString()}
                  </span>
                </div>
                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                  <Link href={`/notes/${note.slug}`} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Recent Users Table
const RecentUsersCard = ({ users }: { users: AdminStats["recentUsers"] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="h-5 w-5" />
        Recent Users
      </CardTitle>
      <CardDescription>Newly registered accounts</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                {user.role}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Main Dashboard Component
const DashboardContent = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchAdminStats,
  });

  const {
    stats,
    recentUsers,
    recentDrafts,
    topViewedNotes,
    notesByClass,
    notesBySubject,
    notesPerDay,
    publishStatusDistribution,
  } = data;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your platform overview.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/notes/create">
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Link>
        </Button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Notes"
          value={stats.totalNotes}
          icon={FileText}
          subtitle={`${stats.publishedNotes} published, ${stats.draftNotes} drafts`}
          trend="up"
          trendValue={`+${stats.notesLast7Days} this week`}
        />
        <StatsCard
          title="Total Views"
          value={stats.totalViews}
          icon={Eye}
          subtitle="Across all published notes"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          subtitle={`+${stats.usersLast7Days} this week`}
          trend={stats.usersLast7Days > 0 ? "up" : "neutral"}
          trendValue={
            stats.usersLast7Days > 0
              ? `${stats.usersLast7Days} new users`
              : undefined
          }
        />
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={BookOpen}
          subtitle={`${stats.publishedCourses} published`}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NotesActivityChart data={notesPerDay} />
        <PublishStatusChart data={publishStatusDistribution} />
        <QuickActionsCard />
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2">
        <NotesByClassChart data={notesByClass} />
        <NotesBySubjectChart data={notesBySubject} />
      </div>

      {/* Activity Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentDraftsCard drafts={recentDrafts} />
        <TopViewedNotesCard notes={topViewedNotes} />
        <RecentUsersCard users={recentUsers} />
      </div>
    </div>
  );
};

// Loading Skeleton
const DashboardSkeleton = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-28" />
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
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

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
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
