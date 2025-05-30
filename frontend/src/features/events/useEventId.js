import { useQuery } from "@tanstack/react-query";
import { getEventById } from "./eventApi";

export function useEventId(id) {
  const {
    isPending: isEventPending,
    data: event,
    error: eventError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });

  return { isEventPending, eventError, event };
}
