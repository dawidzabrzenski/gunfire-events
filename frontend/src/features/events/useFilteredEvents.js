import { useQuery } from "@tanstack/react-query";
import { getEventsByParams } from "./eventApi";

export function useFilteredEvents(params) {
  const { isPending, data, error } = useQuery({
    queryKey: ["events", params],
    queryFn: () => getEventsByParams(params),
  });
  return { isPending, data: data || { events: [], total: 0 }, error };
}
