import { fetchAllNotesServer } from "@/lib/functions";
import { getQueryClient } from "@/lib/query-client";
import { Class, Subject } from "@/lib/type";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesContent from "./notes-content";

type Props = {
  searchParams: Promise<{ class?: Class; subject?: Subject }>;
};

const NotesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const classParam = params.class;
  const subjectParam = params.subject;

  const queryClient = getQueryClient();

  // Prefetch the notes data on the server using server-specific function
  await queryClient.prefetchQuery({
    queryKey: ["all-notes", classParam, subjectParam],
    queryFn: () => fetchAllNotesServer(classParam, subjectParam),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesContent />
    </HydrationBoundary>
  );
};

export default NotesPage;
