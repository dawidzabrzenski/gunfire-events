import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");

        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      await fetchUserData();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const response = await axiosInstance.post("/auth/register", userData);

      await fetchUserData();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");

      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
