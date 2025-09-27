import axios from "axios";

const PORT = 5000;

const api = axios.create({
  baseURL: `http://localhost:${PORT}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token");
  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("Token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
