import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true, // Send cookies with requests
});

export const getMediaUrl = (url) => {
  if (!url) return "";
  if (!url.startsWith("/uploads")) return url;

  const apiBaseURL = API.defaults.baseURL || "/api";
  const apiOrigin = new URL(apiBaseURL, window.location.origin).origin;
  return new URL(url, apiOrigin).toString();
};

// Interceptor to add Authorization Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
