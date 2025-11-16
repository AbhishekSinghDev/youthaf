"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllNotes } from "@/lib/functions";
import { Class, ListNote, Subject } from "@/lib/type";
import { constructFileUrl } from "@/lib/utils";
import { classEnum, subjectEnum } from "@/server/db/schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Calendar,
  FileText,
  Filter,
  GraduationCap,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Header Component
const NotesHeader = () => (
  <div className="relative overflow-hidden py-16 md:py-24">
    {/* Gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
    <div className="absolute top-0 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

    <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Study Resources</span>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Discover Notes
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Explore curated study materials and notes shared by{" "}
            <span className="font-semibold text-primary">Youth AF</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Filter Controls Component
const FilterControls = ({
  classParam,
  subjectParam,
  updateQueryParams,
  notesCount,
}: {
  classParam?: string;
  subjectParam?: string;
  updateQueryParams: (param: string, value: string) => void;
  notesCount: number;
}) => (
  <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px] mb-12 mt-6">
    <div className="flex flex-col gap-6 p-6 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border">
      {/* Top: Filter label */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Filter className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Filter Resources</h3>
          <p className="text-xs text-muted-foreground">
            {notesCount} notes available
          </p>
        </div>
      </div>

      {/* Bottom: Selects */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Select
          onValueChange={(value) => updateQueryParams("class", value)}
          value={classParam || "all"}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-background">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {classEnum.enumValues.map((cls) => (
              <SelectItem key={cls} value={cls} className="capitalize">
                {cls.replaceAll("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => updateQueryParams("subject", value)}
          value={subjectParam || "all"}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-background">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjectEnum.enumValues.map((subj) => (
              <SelectItem key={subj} value={subj} className="capitalize">
                {subj.replaceAll("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);

// Note Card Component
const NoteCard = ({ note }: { note: ListNote }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <Link href={`/notes/${note.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-background to-muted/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={constructFileUrl(note.thumbnailKey)}
            alt={note.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating badges on image */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/95 backdrop-blur-sm border border-border rounded-full text-xs font-medium shadow-lg">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              <span>{note.class.replaceAll("_", " ")}</span>
            </div>

            {note.attachments && note.attachments.length > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/95 backdrop-blur-sm border border-border rounded-full text-xs font-medium shadow-lg">
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>{note.attachments.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3 className="font-bold text-lg leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-primary">
            {note.title}
          </h3>

          {/* Subject Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl text-sm font-medium">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>{note.subject.replaceAll("_", " ")}</span>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {formatDate(note.createdAt)}
            </span>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </Link>
  );
};

// Note Card Skeleton Component
const NoteCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-background to-muted/20">
    <Skeleton className="aspect-[16/9] w-full" />
    <div className="p-5 space-y-4">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-8 w-32 rounded-xl" />
      <div className="flex items-center gap-2 pt-3">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  </div>
);

// Loading State Component
const LoadingState = () => (
  <>
    {Array.from({ length: 6 }).map((_, index) => (
      <NoteCardSkeleton key={index} />
    ))}
  </>
);

// Notes Grid Component - simplified without loading state
const NotesGrid = ({
  notes,
  isError,
  error,
  onRetry,
}: {
  notes: ListNote[];
  isError: boolean;
  error: Error | null;
  onRetry: () => void;
}) => (
  <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px] pb-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isError && <ErrorState error={error as Error} onRetry={onRetry} />}

      {!isError && notes.length === 0 && <EmptyState />}

      {!isError && notes.map((note) => <NoteCard key={note.id} note={note} />)}
    </div>
  </div>
);

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
    <div className="rounded-full bg-gradient-to-br from-primary/10 to-accent/10 p-8 mb-6 border border-border">
      <FileText className="h-16 w-16 text-muted-foreground" />
    </div>
    <h3 className="text-2xl font-bold mb-3">No notes available</h3>
    <p className="text-muted-foreground text-center max-w-md leading-relaxed">
      There are no published notes to display at the moment. Check back later
      for new content.
    </p>
  </div>
);

const ErrorState = ({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) => (
  <div className="col-span-full">
    <Alert variant="destructive" className="border-2">
      <AlertDescription className="flex items-center justify-between">
        <span>{error.message}</span>
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  </div>
);

const NotesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const classParam = searchParams.get("class") as Class | undefined;
  const subjectParam = searchParams.get("subject") as Subject | undefined;

  const { data, isError, error, refetch } = useSuspenseQuery({
    queryKey: ["all-notes", classParam, subjectParam],
    queryFn: () => fetchAllNotes(classParam, subjectParam),
  });

  const publishedNotes = data?.notes.filter((note) => note.isPublished) || [];

  const updateQueryParams = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    const newUrl = `?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="min-h-screen">
      <NotesHeader />
      <FilterControls
        classParam={classParam}
        subjectParam={subjectParam}
        updateQueryParams={updateQueryParams}
        notesCount={publishedNotes.length}
      />
      <NotesGrid
        notes={publishedNotes}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
      />
    </div>
  );
};

const NotesContentSuspense = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NotesContent />
    </Suspense>
  );
};

// Add a loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen">
    <NotesHeader />
    <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px] mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border">
        <Skeleton className="h-12 w-48" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>
    </div>
    <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px] pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <LoadingState />
      </div>
    </div>
  </div>
);

export default NotesContentSuspense;
