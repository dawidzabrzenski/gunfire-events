import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold">
              Gunfire Events
            </Link>
            <div className="ml-10 hidden md:block">
              <div className="flex items-center space-x-4">
                <Link to="/">Strona Główna</Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  {["admin", "organizer"].includes(user.role) && (
                    <Link to="/event/add">Dodaj wydarzenie</Link>
                  )}
                  <button onClick={handleLogout}>Wyloguj</button>
                </>
              ) : (
                <>
                  <Link to="/login">Zaloguj się</Link>
                  <Link to="/register">Rejestracja</Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-blue-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 md:hidden">
          <Link
            to="/"
            className="block rounded-md px-3 py-2 hover:bg-blue-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Strona Główna
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block rounded-md px-3 py-2 hover:bg-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full rounded-md px-3 py-2 text-left hover:bg-blue-700"
              >
                Wyloguj
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block rounded-md px-3 py-2 hover:bg-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block rounded-md bg-white px-3 py-2 text-blue-600 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
