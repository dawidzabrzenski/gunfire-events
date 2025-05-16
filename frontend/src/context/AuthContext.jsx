import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    await fetchUserData();
    return response.data;
  };

  const register = async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    await fetchUserData();
    return response.data;
  };
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const verifyEmailToken = async (token) => {
    try {
      const response = await axiosInstance.get("/auth/verify-email", {
        params: { token },
      });
      return { type: "success", message: response.data.message };
    } catch (error) {
      return {
        type: "error",
        message: error.response?.data?.message || "Wystąpił błąd serwera",
      };
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

  const resendVerificationEmail = async (email) => {
    const response = await axiosInstance.post("/auth/resend-verification", {
      email,
    });

    return response.data;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    verifyEmailToken,
    resendVerificationEmail,
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
