import { createContext, useState, useEffect } from "react";
import { useLoading } from "./LoadingContext";
import apiClient from "../../api/client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn")
    ? JSON.parse(localStorage.getItem("isLoggedIn"))
    : false
  );
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const { setIsLoading } = useLoading();


  const login = async (values) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("accounts/login/", values);

      const token = response.data.access;
      const user = response.data.user;

      setAuthToken(token);
      setIsLoggedIn(true);
      setUserId(user.id);

      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("userId", user.id);

    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await apiClient.post("accounts/logout/", {
          refresh: refreshToken,
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Important: clear stored data whether logout succeeds or fails
      setAuthToken(null);
      setIsLoggedIn(false);
      setUserId(null);

      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
    }
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        authToken,
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
