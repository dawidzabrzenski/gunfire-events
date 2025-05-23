import { useAuth } from "../context/AuthContext";

import EventsList from "../features/eventsList/EventsList";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div>
          <EventsList />
        </div>
      </div>
    </div>
  );
};

export default Home;
