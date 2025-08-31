import { env } from "@/env";
import { ListNote } from "./type";

export const fetchNoteContent = async (
  slug: string
): Promise<{ note: ListNote }> => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/note?slug=${slug}`
  );
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
