import { fetchAdminStatsServer } from "@/lib/functions";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardContent from "./dashboard-content";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchAdminStatsServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardContent />
    </HydrationBoundary>
  );
}
