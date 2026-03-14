import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-backend.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  // Ensure we append /api prefix reliably without getting stripped
  if (config.url && !config.url.startsWith("http") && !config.url.startsWith("/api")) {
    config.url = `/api${config.url.startsWith("/") ? config.url : `/${config.url}`}`;
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;