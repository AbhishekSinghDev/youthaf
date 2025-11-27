"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Link,
  Loader2,
  Paperclip,
  Type,
  X,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Editor } from "@/components/blocks/editor-x/editor";
import DNDFileUploader from "@/components/dnd-file-uploader/uploader";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ListNote } from "@/lib/type";
import { constructFileUrl, generateSlug } from "@/lib/utils";
import { NoteCreationSchema } from "@/lib/zod-schema";
import { classEnum, subjectEnum } from "@/server/db/schema";
import { IconImageInPicture, IconSparkles } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface NotesFormProps {
  slug: string;
}

// Extended schema to track existing attachment IDs
type AttachmentWithId = {
  id?: string; // Only present for existing attachments from DB
  fileName: string;
  fileKey: string;
  fileSize: number;
};

const fetchNoteContent = async (slug: string): Promise<{ note: ListNote }> => {
  const response = await fetch(`/api/admin/note/by-slug?slug=${slug}`);
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

const NotesForm = ({ slug }: NotesFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const initializedSlugRef = useRef<string | null>(null);

  // Track attachments with their IDs separately
  const [attachmentsWithIds, setAttachmentsWithIds] = useState<
    AttachmentWithId[]
  >([]);
  const [deletingAttachmentId, setDeletingAttachmentId] = useState<
    string | null
  >(null);

  const form = useForm<z.infer<typeof NoteCreationSchema>>({
    resolver: zodResolver(NoteCreationSchema),
    defaultValues: {
      title: "",
      content: JSON.stringify({
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      }),
      slug: "",
      isPublished: false,
      attachments: [],
    },
  });

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["adminNoteContent", slug],
    queryFn: () => fetchNoteContent(slug),
    retry: 1,
    staleTime: 30000, // Don't refetch for 30 seconds
  });

  const { mutate: updateNote, isPending: isUpdatingNote } = useMutation({
    mutationKey: ["update-note"],
    mutationFn: async (
      data: z.infer<typeof NoteCreationSchema> & { id: string }
    ) => {
      const response = await fetch("/api/admin/note/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Note updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["adminNoteContent", slug] });
    },
    onError: () => {
      toast.error("Failed to update note");
    },
  });

  const { mutate: deleteAttachment } = useMutation({
    mutationKey: ["delete-attachment"],
    mutationFn: async (attachmentId: string) => {
      setDeletingAttachmentId(attachmentId);
      const response = await fetch("/api/admin/note/attachment/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attachmentId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete attachment");
      }

      return response.json();
    },
    onSuccess: (_, deletedId) => {
      toast.success("Attachment deleted successfully");
      // Remove from local state immediately
      setAttachmentsWithIds((prev) =>
        prev.filter((att) => att.id !== deletedId)
      );
      // Also update form state
      const currentAttachments = form.getValues("attachments") || [];
      const deletedAttachment = attachmentsWithIds.find(
        (att) => att.id === deletedId
      );
      if (deletedAttachment) {
        form.setValue(
          "attachments",
          currentAttachments.filter(
            (att) => att.fileKey !== deletedAttachment.fileKey
          )
        );
      }
      setDeletingAttachmentId(null);
    },
    onError: () => {
      toast.error("Failed to delete attachment");
      setDeletingAttachmentId(null);
    },
  });

  const { mutate: deleteThumbnail, isPending: isDeletingThumbnail } =
    useMutation({
      mutationKey: ["delete-thumbnail"],
      mutationFn: async (thumbnailKey: string) => {
        const response = await fetch("/api/s3/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: thumbnailKey }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete thumbnail");
        }

        return response.json();
      },
      onSuccess: () => {
        toast.success("Thumbnail deleted successfully");
        form.setValue("thumbnailKey", "");
      },
      onError: () => {
        toast.error("Failed to delete thumbnail");
      },
    });

  const onSubmit = (values: z.infer<typeof NoteCreationSchema>) => {
    if (data?.note?.id) {
      updateNote({ ...values, id: data.note.id });
    }
  };

  const handleAttachmentAdd = useCallback(
    (fileKey: string, fileName: string, fileSize: number) => {
      const newAttachment: AttachmentWithId = {
        fileName,
        fileKey,
        fileSize,
      };

      // Add to local state
      setAttachmentsWithIds((prev) => [...prev, newAttachment]);

      // Add to form state
      const currentAttachments = form.getValues("attachments") || [];
      form.setValue("attachments", [
        ...currentAttachments,
        { fileName, fileKey, fileSize },
      ]);
    },
    [form]
  );

  const handleRemoveNewAttachment = useCallback(
    (fileKey: string) => {
      // Remove from local state (for new attachments without ID)
      setAttachmentsWithIds((prev) =>
        prev.filter((att) => att.fileKey !== fileKey)
      );

      // Remove from form state
      const currentAttachments = form.getValues("attachments") || [];
      form.setValue(
        "attachments",
        currentAttachments.filter((att) => att.fileKey !== fileKey)
      );
    },
    [form]
  );

  const handleThumbnailChange = (newThumbnailKey: string) => {
    const currentThumbnailKey = form.getValues("thumbnailKey");

    // If there's an existing thumbnail, delete it first
    if (currentThumbnailKey && currentThumbnailKey !== newThumbnailKey) {
      deleteThumbnail(currentThumbnailKey);
    }

    form.setValue("thumbnailKey", newThumbnailKey);
  };

  const handleThumbnailDelete = () => {
    const currentThumbnailKey = form.getValues("thumbnailKey");
    if (currentThumbnailKey) {
      deleteThumbnail(currentThumbnailKey);
    }
  };

  // Initialize form only once when data is first loaded
  useEffect(() => {
    if (data?.note && !isInitialized && initializedSlugRef.current !== slug) {
      initializedSlugRef.current = slug;

      const attachments =
        data.note.attachments?.map((att) => ({
          id: att.id,
          fileName: att.fileName,
          fileKey: att.fileKey,
          fileSize: Number(att.fileSize),
        })) || [];

      setAttachmentsWithIds(attachments);

      form.reset({
        title: data.note.title,
        content: data.note.content,
        slug: data.note.slug,
        thumbnailKey: data.note?.thumbnailKey ?? "",
        class: data.note.class || undefined,
        subject: data.note.subject || undefined,
        isPublished: data.note.isPublished,
        attachments: attachments.map(({ fileName, fileKey, fileSize }) => ({
          fileName,
          fileKey,
          fileSize,
        })),
      });

      setIsInitialized(true);
    }
  }, [data, form, isInitialized, slug]);

  // Watch thumbnail for preview
  const thumbnailKey = useWatch({
    control: form.control,
    name: "thumbnailKey",
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <NextLink
            href="/admin/notes"
            className={buttonVariants({ size: "icon", variant: "outline" })}
          >
            <ArrowLeft className="h-4 w-4" />
          </NextLink>
          <h1 className="text-2xl font-bold">Edit Note</h1>
        </div>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              <p className="font-medium">Failed to load note</p>
              <p className="text-sm text-muted-foreground mt-1">
                {error instanceof Error ? error.message : "An error occurred"}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push("/admin/notes")}
              >
                Back to Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <NextLink
          href="/admin/notes"
          className={buttonVariants({ size: "icon", variant: "outline" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </NextLink>
        <h1 className="text-2xl font-bold">Edit Note</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Note Details</CardTitle>
          <CardDescription>Update the note information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Type className="w-4 h-4" />
                      Note Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter note title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug Field */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Link className="w-4 h-4" />
                      URL Slug
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          placeholder="note-url-slug"
                          {...field}
                          disabled
                          className="bg-muted"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          form.setValue(
                            "slug",
                            generateSlug(form.getValues("title"))
                          )
                        }
                        disabled
                      >
                        <IconSparkles className="mr-2" />
                        Generate
                      </Button>
                    </div>
                    <FormDescription>
                      The URL slug cannot be changed after creation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content Field */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <BookOpen className="w-4 h-4" />
                      Note Content
                    </FormLabel>
                    <FormControl>
                      <Editor
                        editorSerializedState={JSON.parse(field.value)}
                        onSerializedChange={(value) =>
                          field.onChange(JSON.stringify(value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail Section */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="thumbnailKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <IconImageInPicture className="w-4 h-4" />
                        Note Thumbnail
                      </FormLabel>
                      <FormControl>
                        <DNDFileUploader
                          value={field.value}
                          onChange={handleThumbnailChange}
                          onDelete={handleThumbnailDelete}
                          fileType="image"
                          allowReplacement={true}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload an image to use as the note thumbnail.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {thumbnailKey && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Thumbnail Preview</h4>
                    <div className="relative w-full max-w-md">
                      <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                        <Image
                          src={constructFileUrl(thumbnailKey)}
                          alt="Note thumbnail preview"
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleThumbnailDelete}
                        disabled={isDeletingThumbnail}
                      >
                        {isDeletingThumbnail ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Attachments Section */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="attachments"
                  render={() => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <Paperclip className="w-4 h-4" />
                        PDF Attachments
                      </FormLabel>
                      <FormControl>
                        <DNDFileUploader
                          value=""
                          onChange={(
                            fileKey: string,
                            fileName?: string,
                            fileSize?: number
                          ) => {
                            if (fileKey && fileName && fileSize) {
                              handleAttachmentAdd(fileKey, fileName, fileSize);
                            }
                          }}
                          fileType="document"
                        />
                      </FormControl>
                      <FormDescription>
                        Upload PDF files as attachments. Maximum file size: 10MB
                        per file.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Display all attachments (both existing and new) */}
                {attachmentsWithIds.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      Attachments ({attachmentsWithIds.length})
                    </h4>
                    <div className="space-y-2">
                      {attachmentsWithIds.map((attachment) => (
                        <div
                          key={attachment.id || attachment.fileKey}
                          className="flex items-center justify-between border p-3 rounded-md bg-muted/30"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Paperclip className="w-4 h-4 shrink-0 text-muted-foreground" />
                            <span className="text-sm truncate">
                              {attachment.fileName}
                            </span>
                            <span className="text-xs text-muted-foreground shrink-0">
                              ({Math.round(attachment.fileSize / 1024)} KB)
                            </span>
                            {!attachment.id && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                New
                              </span>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={() =>
                              attachment.id
                                ? deleteAttachment(attachment.id)
                                : handleRemoveNewAttachment(attachment.fileKey)
                            }
                            disabled={deletingAttachmentId === attachment.id}
                          >
                            <span className="sr-only">Remove attachment</span>
                            {deletingAttachmentId === attachment.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Class and Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <BookOpen className="w-4 h-4" />
                        Class
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {classEnum.enumValues.map((value) => (
                              <SelectItem
                                key={value}
                                value={value}
                                className="capitalize"
                              >
                                {value.replaceAll("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <BookOpen className="w-4 h-4" />
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectEnum.enumValues.map((value) => (
                              <SelectItem
                                key={value}
                                value={value}
                                className="capitalize"
                              >
                                {value.replaceAll("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Published Status */}
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <FileText className="w-4 h-4" />
                        Publish Note
                      </FormLabel>
                      <FormDescription>
                        Make this note visible to users.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/notes")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdatingNote}>
                  {isUpdatingNote && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isUpdatingNote ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesForm;
