import { useQuery } from "@tanstack/react-query";
import { getAllEvents as getEvents } from "./eventApi";

export function useEvents() {
  const {
    isPending: isEventsPending,
    data: events,
    error: eventsError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return { isEventsPending, eventsError, events };
}
