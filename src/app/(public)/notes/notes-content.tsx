"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Class, ListNote, Subject } from "@/lib/type";
import { constructFileUrl } from "@/lib/utils";
import { classEnum, subjectEnum } from "@/server/db/schema";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const fetchAllNotes = async (
  classParam?: string,
  subjectParam?: string
): Promise<{ notes: ListNote[] }> => {
  let url = "/api/note/all";

  if (classParam || subjectParam) {
    const queryParams = new URLSearchParams();
    if (classParam) queryParams.append("class", classParam);
    if (subjectParam) queryParams.append("subject", subjectParam);
    url += `?${queryParams.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Note not found. The requested note may have been deleted or moved."
      );
    }
    if (response.status === 403) {
      throw new Error(
        "Access denied. You don't have permission to view this note."
      );
    }
    throw new Error("Failed to load note content. Please try again later.");
  }
  const data = await response.json();
  return data;
};

// Header Component
const NotesHeader = () => (
  <div className="mb-8 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
    <div>
      <h1 className="text-4xl font-bold text-foreground mb-2">
        Discover Notes
      </h1>
      <p className="text-muted-foreground">
        Explore a variety of notes shared by{" "}
        <span className="font-semibold">Youth AF</span>
      </p>
    </div>
  </div>
);

// Filter Controls Component
const FilterControls = ({
  classParam,
  subjectParam,
  updateQueryParams,
}: {
  classParam?: string;
  subjectParam?: string;
  updateQueryParams: (param: string, value: string) => void;
}) => (
  <div className="flex items-center gap-3 mb-8">
    <Select
      onValueChange={(value) => updateQueryParams("class", value)}
      value={classParam || "all"}
    >
      <SelectTrigger className="w-[180px]">
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
      <SelectTrigger className="w-[180px]">
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
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={constructFileUrl(note.thumbnailKey)}
            alt={note.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {note.title}
          </h3>

          {/* Class and Subject Info */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Class {note.class.replaceAll("_", " ")}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{note.subject.replaceAll("_", " ")}</span>
            </div>
          </div>

          {/* Footer with date and attachments */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(note.createdAt)}</span>
            </div>

            {/* Attachment indicator */}
            {note.attachments && note.attachments.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FileText className="w-3 h-3" />
                <span>{note.attachments.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Note Card Skeleton Component
const NoteCardSkeleton = () => (
  <div className="border shadow-sm rounded-lg overflow-hidden">
    <div className="relative">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="absolute top-3 left-3">
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="absolute top-3 right-3">
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>

    <CardContent className="p-6 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </CardContent>
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

// Notes Grid Component
const NotesGrid = ({
  notes,
  isLoading,
  isError,
  error,
  onRetry,
}: {
  notes: ListNote[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onRetry: () => void;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {isLoading && <LoadingState />}

    {isError && <ErrorState error={error as Error} onRetry={onRetry} />}

    {!isLoading && !isError && notes.length === 0 && <EmptyState />}

    {!isLoading &&
      !isError &&
      notes.map((note) => <NoteCard key={note.id} note={note} />)}
  </div>
);

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
    <div className="rounded-full bg-muted p-6 mb-4">
      <FileText className="h-12 w-12 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-semibold mb-2">No notes available</h3>
    <p className="text-muted-foreground text-center max-w-md">
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
    <Alert variant="destructive">
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

  const { data, isLoading, isError, error, refetch } = useQuery({
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
    <div className="max-w-full mx-auto lg:px-8 lg:py-4">
      <NotesHeader />
      <FilterControls
        classParam={classParam}
        subjectParam={subjectParam}
        updateQueryParams={updateQueryParams}
      />
      <NotesGrid
        notes={publishedNotes}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
      />
    </div>
  );
};

const NotesContentSuspense = () => {
  return (
    <Suspense fallback={null}>
      <NotesContent />
    </Suspense>
  );
};

export default NotesContentSuspense;
