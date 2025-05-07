import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Wyloguj
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Twój profil</h2>
        {user && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Imię i nazwisko</p>
              <p className="font-medium">
                {user.first_name} {user.last_name}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Nazwa użytkownika</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Rola</p>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
