import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg p-6 transition-colors duration-500">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
        >
          Wyloguj
        </button>
      </div>

      <div className="mb-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">Twój profil</h2>
        {user && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                Imię i nazwisko
              </p>
              <p className="font-medium">
                {user.first_name} {user.last_name}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                Nazwa użytkownika
              </p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Rola</p>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
