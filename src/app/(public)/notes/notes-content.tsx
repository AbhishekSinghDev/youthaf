"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Class, ListNote, Subject } from "@/lib/type";
import { constructFileUrl } from "@/lib/utils";
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
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const classParam = searchParams.get("class") as Class | undefined;
  const subjectParam = searchParams.get("subject") as Subject | undefined;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["all-notes"],
    queryFn: () => fetchAllNotes(classParam, subjectParam),
  });

  const publishedNotes = data?.notes.filter((note) => note.isPublished) || [];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="max-w-full mx-auto lg:px-8 lg:py-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Discover Notes
        </h1>
        <p className="text-muted-foreground">
          Explore a variety of notes shared by{" "}
          <span className="font-semibold">Youth AF</span>
        </p>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <NoteCardSkeleton key={index} />
            ))}
          </>
        )}

        {isError && (
          <ErrorState error={error as Error} onRetry={() => refetch()} />
        )}

        {!isLoading && !isError && publishedNotes.length === 0 && (
          <EmptyState />
        )}

        {!isLoading &&
          !isError &&
          publishedNotes.map((note) => (
            <Link href={`/notes/${note.slug}`} key={note.id}>
              <div className="border shadow-sm hover:shadow-md rounded-lg overflow-hidden">
                {/* Thumbnail with badges */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={constructFileUrl(note.thumbnailKey)}
                    alt={note.title}
                    fill
                    className="object-cover"
                  />

                  {/* Class badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-800"
                    >
                      <GraduationCap className="w-3 h-3 mr-1" />
                      Class {note.class}
                    </Badge>
                  </div>

                  {/* Subject badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="default">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {note.subject}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Title */}
                    <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
                      {note.title}
                    </CardTitle>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(note.createdAt)}
                      </div>

                      {/* Attachment indicator */}
                      {note.attachments && note.attachments.length > 0 && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Link>
          ))}
      </div>
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
