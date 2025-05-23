import { useState } from "react";

import { useEvents } from "../events/useEvents";
import { useFilteredEvents } from "../events/useFilteredEvents";

import EventCard from "./eventCard";
import ListFilter from "./ListFilter";
import ListSort from "./ListSort";
import DatePopover from "./DatePopover";
import NoEventsFound from "./NoEventsFound";

function EventsList() {
  const [params, setParams] = useState({
    category_id: null,
    city: "",
    date: null,
    date_from: null,
    date_to: null,
    voivodeship_id: null,
    organizer_id: null,
    title: "",
    status: "",
    sortBy: "date",
    sortOrder: "ASC",
    page: 1,
    limit: 10,
  });

  // const params = { page: 1, limit: 3 };

  const { isPending, data } = useFilteredEvents(params);

  const handleParamChange = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (isPending) return <p>Loading</p>;

  return (
    <>
      <div className="flex justify-between">
        <DatePopover
          date={params.date}
          dateFrom={params.date_from}
          dateTo={params.date_to}
          onChange={handleParamChange}
        />
        <ListFilter onChange={handleParamChange} />
        <ListSort
          sortBy={params.sortBy}
          sortOrder={params.sortOrder}
          onChange={handleParamChange}
        />
      </div>

      <div className="flex flex-col gap-6">
        {data?.events?.length > 0 ? (
          data.events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              description={event.description}
              fee={event.fee}
              image_url={event.image_url}
            />
          ))
        ) : (
          <NoEventsFound />
        )}
      </div>
    </>
  );
}

export default EventsList;
