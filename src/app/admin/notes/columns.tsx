"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import { ListNote } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { Eye, EyeOff, Paperclip } from "lucide-react";
import { NotesRowActions } from "./notes-row-actions";

export const notesColumns: ColumnDef<ListNote>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "class",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
    cell: ({ row }) => {
      const classValue = row.getValue("class") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {classValue?.replaceAll("_", " ")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      const subject = row.getValue("subject") as string;
      return (
        <Badge variant="secondary" className="capitalize">
          {subject?.replaceAll("_", " ")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") as boolean;
      return (
        <Badge variant={isPublished ? "default" : "secondary"}>
          {isPublished ? (
            <>
              <Eye className="h-3 w-3 mr-1" />
              Published
            </>
          ) : (
            <>
              <EyeOff className="h-3 w-3 mr-1" />
              Draft
            </>
          )}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      const isPublished = row.getValue(id) as boolean;
      return value.includes(isPublished ? "published" : "draft");
    },
  },
  {
    accessorKey: "attachments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PDFs" />
    ),
    cell: ({ row }) => {
      const attachments = row.original.attachments || [];
      return (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Paperclip className="h-4 w-4" />
          <span>{attachments.length}</span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <span className="text-muted-foreground text-sm">
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <NotesRowActions note={row.original} />,
  },
];
