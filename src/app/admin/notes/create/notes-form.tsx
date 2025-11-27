"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  FileText,
  Link,
  Loader2,
  Paperclip,
  Type,
  X,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import DNDFileUploader from "@/components/dnd-file-uploader/uploader";
import { Button } from "@/components/ui/button";
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
import { generateSlug } from "@/lib/utils";
import { NoteCreationSchema } from "@/lib/zod-schema";
import { IconImageInPicture, IconSparkles } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Editor } from "@/components/blocks/editor-x/editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classEnum, subjectEnum } from "@/server/db/schema";
import { useCallback, useState } from "react";
import z4 from "zod/v4";

type AttachmentItem = {
  fileName: string;
  fileKey: string;
  fileSize: number;
};

type NoteFormValues = z4.input<typeof NoteCreationSchema>;

const NotesForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);

  const form = useForm<NoteFormValues>({
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

  const { mutate: createNote, isPending: isCreatingNote } = useMutation({
    mutationKey: ["create-note"],
    mutationFn: async (data: NoteFormValues) => {
      const response = await fetch("/api/admin/note/create", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Note created successfully!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/admin/notes");
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  const onSubmit = (values: NoteFormValues) => {
    createNote(values);
  };

  const handleAttachmentAdd = useCallback(
    (fileKey: string, fileName: string, fileSize: number) => {
      const newAttachment: AttachmentItem = {
        fileName,
        fileKey,
        fileSize,
      };

      setAttachments((prev) => [...prev, newAttachment]);

      const currentAttachments = form.getValues("attachments") || [];
      form.setValue("attachments", [
        ...currentAttachments,
        { fileName, fileKey, fileSize },
      ]);
    },
    [form]
  );

  const handleRemoveAttachment = useCallback(
    (fileKey: string) => {
      setAttachments((prev) => prev.filter((att) => att.fileKey !== fileKey));

      const currentAttachments = form.getValues("attachments") || [];
      form.setValue(
        "attachments",
        currentAttachments.filter((att) => att.fileKey !== fileKey)
      );
    },
    [form]
  );

  // Watch for title changes to enable auto-slug generation
  const title = useWatch({ control: form.control, name: "title" });

  return (
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
                  onClick={() => form.setValue("slug", generateSlug(title))}
                  disabled={!title}
                >
                  <IconSparkles className="mr-2" />
                  Generate
                </Button>
              </div>
              <FormDescription>
                This will be used in the URL. Click &quot;Generate&quot; to
                create from title.
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

        {/* Note Thumbnail */}
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
                  onChange={field.onChange}
                  fileType="image"
                />
              </FormControl>
              <FormDescription>
                Upload an image to use as the note thumbnail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  Upload PDF files as attachments. Maximum file size: 10MB per
                  file.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display added attachments */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                Added Attachments ({attachments.length})
              </h4>
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.fileKey}
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
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => handleRemoveAttachment(attachment.fileKey)}
                    >
                      <span className="sr-only">Remove attachment</span>
                      <X className="w-4 h-4" />
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  Make this note visible to users immediately after creation.
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
          <Button type="submit" disabled={isCreatingNote}>
            {isCreatingNote && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isCreatingNote ? "Creating..." : "Create Note"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NotesForm;
