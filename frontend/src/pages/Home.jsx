import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="transition-colors duration-500 ">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Test</h1>
          <p className="text-xl text-gray-600 mb-8">Test events</p>

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
