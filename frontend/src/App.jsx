import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./features/auth/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyForm from "./pages/VerifyForm";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import NavBar from "./components/common/Navbar";
import NavBarNew from "./components/common/NavbarNew";
import Footer from "./components/common/Footer";
import EventPage from "./pages/EventPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        {/* <NavBarNew /> */}
        <div className="text-text-main bg-bg-main min-h-screen transition-colors duration-500">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email-verification" element={<VerifyForm />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/event/:id" element={<EventPage />} />

            <Route
              element={
                <ProtectedRoute allowedRoles={["user", "admin", "organizer"]} />
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["admin", "organizer"]} />}
            >
              <Route path="/event/add" element={<AddEvent />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["admin"]} />}
            ></Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
