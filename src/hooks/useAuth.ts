import { useState, useEffect, useRef } from "react";
import api from "../apis/api";

export function useAuth() {
  const [user, setUser] = useState<string | null>(() => {
    const token = localStorage.getItem("Token");
    const userEmail = localStorage.getItem("UserEmail");
    return token && userEmail ? userEmail : null;
  });

  const refreshInterval = useRef<NodeJS.Timeout | null>(null);

  const setAuthHeader = (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const startAutoRefresh = () => {
    if (refreshInterval.current) clearInterval(refreshInterval.current);

    // Refresh every 14 minutes (assuming access token is valid for 15 mins)
    refreshInterval.current = setInterval(async () => {
      try {
        const res = await api.get("/refresh", { withCredentials: true });
        const { accessToken } = res.data;
        localStorage.setItem("Token", accessToken);
        setAuthHeader(accessToken);
      } catch (err) {
        logout(); // refresh failed, log out
      }
    }, 14 * 60 * 1000);
  };

  useEffect(() => {
    if (user) startAutoRefresh();
    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
        refreshInterval.current = null;
      }
    };
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/user/login", { email, password });
      const { email: userEmail, accessToken } = res.data;

      setUser(userEmail);
      localStorage.setItem("Token", accessToken);
      localStorage.setItem("UserEmail", userEmail);
      setAuthHeader(accessToken);

      startAutoRefresh();
      return true;
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("UserEmail");
    if (refreshInterval.current) {
      clearInterval(refreshInterval.current);
      refreshInterval.current = null;
    }
  };

  const isAuthenticated = !!user;

  return { user, isAuthenticated, login, logout };
}
