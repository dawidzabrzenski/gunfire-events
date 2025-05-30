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

      <div className="bg-bg-surface border-1 border-border mb-6 rounded-lg p-4">
        <h2 className="mb-4 text-xl font-semibold">Twój profil</h2>
        {user && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-text-muted">Imię i nazwisko</p>
              <p className="font-medium">
                {user.first_name} {user.last_name}
              </p>
            </div>
            <div>
              <p className="text-text-muted">Nazwa użytkownika</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-text-muted">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-text-muted">Rola</p>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
