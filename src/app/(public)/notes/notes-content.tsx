"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ListNote } from "@/lib/type";
import { constructFileUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { FileText, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fetchAllNotes = async (): Promise<{ notes: ListNote[] }> => {
  const response = await fetch(`/api/note/all`);
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
  <Card className="overflow-hidden">
    <Skeleton className="aspect-video w-full" />
    <CardHeader className="px-6 pt-6 pb-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <Skeleton className="h-4 w-1/3" />
    </CardContent>
  </Card>
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
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["all-notes"],
    queryFn: fetchAllNotes,
  });

  const publishedNotes = data?.notes.filter((note) => note.isPublished) || [];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
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
              <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-border/50 hover:border-border">
                {/* Thumbnail */}
                <div className="aspect-video object-cover bg-muted overflow-hidden relative">
                  <Image
                    src={constructFileUrl(note.thumbnailKey)}
                    alt={note.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="px-6 pt-6 pb-4">
                  <CardTitle className="line-clamp-2 leading-tight text-base font-semibold group-hover:text-primary transition-colors duration-200">
                    {note.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NotesContent;
