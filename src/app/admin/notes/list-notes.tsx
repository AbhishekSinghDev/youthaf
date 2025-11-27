"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminNotes } from "@/lib/functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { Suspense } from "react";
import { notesColumns } from "./columns";
import { NotesDataTable } from "./notes-data-table";

const NotesContent = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["notes"],
    queryFn: fetchAdminNotes,
  });

  if (!data?.notes?.length) {
    return (
      <div className="text-center py-12 border rounded-md">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <div className="text-muted-foreground font-medium">No notes found</div>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first note to get started
        </p>
      </div>
    );
  }

  return <NotesDataTable columns={notesColumns} data={data.notes} />;
};

const NotesSkeleton = () => (
  <div className="space-y-4">
    {/* Toolbar Skeleton */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <Skeleton className="h-8 w-[80px]" />
    </div>
    {/* Table Skeleton */}
    <div className="border rounded-md">
      <div className="border-b p-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="border-b p-4 last:border-0">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-6 w-[70px] rounded-full" />
            <Skeleton className="h-6 w-[100px] rounded-full" />
            <Skeleton className="h-6 w-[80px] rounded-full" />
            <Skeleton className="h-4 w-[40px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      ))}
    </div>
    {/* Pagination Skeleton */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-[150px]" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  </div>
);

const ListNotes = () => {
  return (
    <Suspense fallback={<NotesSkeleton />}>
      <NotesContent />
    </Suspense>
  );
};

export default ListNotes;
