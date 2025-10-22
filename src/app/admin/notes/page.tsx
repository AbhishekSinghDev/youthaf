import { buttonVariants } from "@/components/ui/button";
import { fetchAdminNotesServer } from "@/lib/functions";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import ListNotes from "./list-notes";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: fetchAdminNotesServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Notes</h1>

          <Link href="/admin/notes/create" className={buttonVariants()}>
            Create Note
          </Link>
        </div>

        <ListNotes />
      </div>
    </HydrationBoundary>
  );
};

export default page;
