import { useState } from "react";
import { useParams } from "react-router-dom";

import Map from "../components/Map/Map";

import { useEventId } from "../features/events/useEventId";
import { formatEventDate } from "../utils/formatEventDate";

function EventPage() {
  const { id } = useParams();
  const { event, isEventPending } = useEventId(id);
  const date = formatEventDate(event?.date);

  if (isEventPending) {
    return <p>Ładowanie...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <img
        src={`http://localhost:8000${event?.image_url}`}
        className="max-h-[20vw] w-full object-cover object-center"
      />
      <div className="px-24">
        <div className="bg-bg-surface flex items-center justify-between rounded-lg px-6 py-4">
          <div className="flex items-center gap-6">
            <p onClick={() => console.log(date)}>{date.dayOfWeek}</p>
            <h2 className="text-4xl font-semibold">{event?.title}</h2>
          </div>
          <p className="font-semibold">Wpisowe: {event?.fee} zł</p>
        </div>
      </div>

      {event.latitude !== undefined && event.longitude !== undefined && (
        <Map
          readonly={true}
          initialPosition={[event.latitude, event.longitude]}
        />
      )}

      <div className="flex flex-col gap-2 px-24">
        <h3 className="text-2xl font-semibold">Opis wydarzenia:</h3>
        <div className="bg-bg-surface rounded-lg px-6 py-4">
          {event?.description}
        </div>
      </div>
    </div>
  );
}

export default EventPage;
