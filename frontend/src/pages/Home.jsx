import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../features/events/useEvents";

import EventCard from "../features/eventsList/eventCard";

const Home = () => {
  const { user } = useAuth();
  const { events } = useEvents();

  return (
    <div className="transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Test</h1>
          <p
            className="mb-8 text-xl text-gray-600"
            onClick={() => console.log(events)}
          >
            Test events
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {events?.map((event) => (
            <EventCard
              title={event.title}
              date={event.date}
              description={event.description}
              fee={event.fee}
              image_url={event.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
