import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Test</h1>
          <p className="mb-8 text-xl text-gray-600">Test events</p>

          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link to="/dashboard"> Dashboard</Link>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
