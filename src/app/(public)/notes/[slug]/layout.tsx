import { fetchNoteContentServer } from "@/lib/functions";
import { constructFileUrl } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  try {
    const data = await fetchNoteContentServer(slug);
    const note = data.note;

    if (!note) {
      return {
        title: "Note Not Found",
        description: "The requested note could not be found.",
      };
    }

    const title = note.title || `Note: ${slug}`;
    const description = note.content?.substring(0, 160) || "Read this note.";
    const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/notes/${slug}`;
    const coverImage = note.thumbnailKey
      ? constructFileUrl(note.thumbnailKey)
      : undefined;

    return {
      title,
      description,

      // Open Graph
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "Skillex",
        type: "article",
        publishedTime: new Date(note.createdAt).toISOString(),
        modifiedTime: new Date(note.updatedAt).toISOString(),
        images: coverImage
          ? [
              {
                url: coverImage,
                width: 1200,
                height: 630,
                alt: title,
              },
            ]
          : undefined,
      },

      // Twitter Card
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: coverImage ? [coverImage] : undefined,
      },

      // Additional SEO
      alternates: {
        canonical: canonicalUrl,
      },

      // Robots
      robots: {
        index: note.isPublished,
        follow: note.isPublished,
        googleBot: {
          index: note.isPublished,
          follow: note.isPublished,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Note Not Found",
      description: "The requested note could not be found.",
    };
  }
}

const NoteSlugLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default NoteSlugLayout;
