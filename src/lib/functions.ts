import { env } from "@/env";
import { ListNote } from "./type";

// Helper to determine if we're on the server
const isServer = typeof window === "undefined";

// Helper to get base URL
const getBaseUrl = () => {
  if (isServer) {
    return env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";
  }
  return "";
};

// Server-side fetch for note content (with cache config)
export const fetchNoteContentServer = async (
  slug: string
): Promise<{ note: ListNote }> => {
  const url = `${getBaseUrl()}/api/note?slug=${slug}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // 1 hour cache
  });

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

  return response.json();
};

// Client-side fetch for note content (no cache config)
export const fetchNoteContent = async (
  slug: string
): Promise<{ note: ListNote }> => {
  const url = `/api/note?slug=${slug}`;

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

  return response.json();
};

// Server-side fetch for all notes (with cache config)
export const fetchAllNotesServer = async (
  classParam?: string,
  subjectParam?: string
): Promise<{ notes: ListNote[] }> => {
  let url = `${getBaseUrl()}/api/note/all`;

  if (classParam || subjectParam) {
    const queryParams = new URLSearchParams();
    if (classParam) queryParams.append("class", classParam);
    if (subjectParam) queryParams.append("subject", subjectParam);
    url += `?${queryParams.toString()}`;
  }

  const response = await fetch(url, {
    next: { revalidate: 60 }, // 1 minute cache
  });

  if (!response.ok) {
    throw new Error("Failed to load notes");
  }

  return response.json();
};

// Client-side fetch for all notes (no cache config)
export const fetchAllNotes = async (
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
    throw new Error("Failed to load notes");
  }

  return response.json();
};

// Admin Stats Types
export type AdminStats = {
  stats: {
    totalUsers: number;
    totalCourses: number;
    publishedCourses: number;
    totalNotes: number;
    publishedNotes: number;
    totalViews: number;
  };
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
  }>;
  recentNotes: Array<{
    id: string;
    title: string;
    class: string;
    subject: string;
    views: string;
    isPublished: boolean;
    createdAt: Date;
  }>;
  notesByClass: Array<{
    class: string;
    count: number;
  }>;
  notesBySubject: Array<{
    subject: string;
    count: number;
  }>;
};

// Server-side fetch for admin stats
export const fetchAdminStatsServer = async (): Promise<AdminStats> => {
  const url = `${getBaseUrl()}/api/admin/stats`;

  const response = await fetch(url, {
    next: { revalidate: 60 }, // 1 minute cache
  });

  if (!response.ok) {
    throw new Error("Failed to load admin statistics");
  }

  return response.json();
};

// Client-side fetch for admin stats
export const fetchAdminStats = async (): Promise<AdminStats> => {
  const url = "/api/admin/stats";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load admin statistics");
  }

  return response.json();
};

// Server-side fetch for admin notes
export const fetchAdminNotesServer = async (): Promise<{
  notes: ListNote[];
}> => {
  const url = `${getBaseUrl()}/api/admin/note`;

  const response = await fetch(url, {
    next: { revalidate: 60 }, // 1 minute cache
  });

  if (!response.ok) {
    throw new Error("Failed to load notes");
  }

  return response.json();
};

// Client-side fetch for admin notes
export const fetchAdminNotes = async (): Promise<{ notes: ListNote[] }> => {
  const url = "/api/admin/note";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load notes");
  }

  return response.json();
};
