import { env } from "@/env";
import { classesData } from "@/lib/constant";
import { ListNote } from "@/lib/type";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let noteEntries: MetadataRoute.Sitemap = [];

  try {
    const notes = (await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/note/all`
    ).then((res) => res.json())) as { notes: ListNote[] };

    noteEntries = notes.notes.map((note) => ({
      url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/notes/${note.slug}`,
      lastModified: note.updatedAt || note.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.warn("Failed to fetch notes for sitemap during build:", error);
    // noteEntries remains empty array if fetch fails
  }

  const classEntries: MetadataRoute.Sitemap = [];

  // Generate URLs for each class and their subjects
  Object.entries(classesData).forEach(([classSlug, classData]) => {
    // Add class page URL
    classEntries.push({
      url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/class/${classSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });

    // Add subject page URLs for this class
    classData.subjects.forEach((subject) => {
      classEntries.push({
        url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/class/${classSlug}/${subject.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    });
  });

  return [
    {
      url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/class`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...classEntries,
    ...noteEntries,
  ];
}
