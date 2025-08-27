import axios from "axios";

// Base URL ayarla
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://staj-otomasyon-api.vercel.app"
    : "http://localhost:5000");

// Request interceptor - her istekte token ekle
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      window.location.href = "/login";
    }
    if (error.response?.status === 403) {
      console.error("Yetkisiz erişim:", error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default axios;
