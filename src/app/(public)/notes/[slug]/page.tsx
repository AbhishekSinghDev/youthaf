import { fetchNoteContentServer } from "@/lib/functions";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteContent from "./note-content";

interface NoteDetailPageProps {
  params: Promise<{ slug: string }>;
}

const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
  const { slug } = await params;
  const queryClient = getQueryClient();

  // Prefetch the note data on the server using server-specific function
  await queryClient.prefetchQuery({
    queryKey: ["noteContent", slug],
    queryFn: () => fetchNoteContentServer(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteContent slug={slug} />
    </HydrationBoundary>
  );
};

export default NoteDetailPage;
