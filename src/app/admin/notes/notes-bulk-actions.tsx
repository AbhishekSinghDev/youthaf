"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListNote } from "@/lib/type";
import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NotesBulkActionsProps {
  selectedNotes: ListNote[];
  onClearSelection: () => void;
}

export function NotesBulkActions({
  selectedNotes,
  onClearSelection,
}: NotesBulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: bulkPublish, isPending: isPublishing } = useMutation({
    mutationKey: ["bulk-publish-notes"],
    mutationFn: async (isPublished: boolean) => {
      const response = await fetch("/api/admin/note/bulk-publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedNotes.map((note) => note.id),
          isPublished,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update notes");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClearSelection();
    },
    onError: () => {
      toast.error("Failed to update notes");
    },
  });

  const { mutate: bulkDelete, isPending: isDeleting } = useMutation({
    mutationKey: ["bulk-delete-notes"],
    mutationFn: async () => {
      const response = await fetch("/api/admin/note/bulk-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedNotes.map((note) => note.id),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete notes");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClearSelection();
      setShowDeleteDialog(false);
    },
    onError: () => {
      toast.error("Failed to delete notes");
    },
  });

  const isPending = isPublishing || isDeleting;

  if (selectedNotes.length === 0) return null;

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {selectedNotes.length} selected
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={isPending}>
              Bulk Actions
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => bulkPublish(true)}
              disabled={isPending}
            >
              <IconEye className="h-4 w-4 mr-2" />
              Publish All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => bulkPublish(false)}
              disabled={isPending}
            >
              <IconEyeOff className="h-4 w-4 mr-2" />
              Unpublish All
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isPending}
            >
              <IconTrash className="h-4 w-4 mr-2" />
              Delete All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedNotes.length} note
              {selectedNotes.length > 1 ? "s" : ""} and all their attachments.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => bulkDelete()}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting
                ? "Deleting..."
                : `Delete ${selectedNotes.length} notes`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
