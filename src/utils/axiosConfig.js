// src/utils/axiosConfig.js
import axios from 'axios';

// Base URL ayarla
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Request interceptor - her istekte token ekle
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 401 hatalarını yakala
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized hatası
    if (error.response?.status === 401) {
      // Token'ı temizle
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      
      // Login sayfasına yönlendir
      window.location.href = '/login';
    }
    
    // 403 Forbidden hatası
    if (error.response?.status === 403) {
      console.error('Yetkisiz erişim:', error.response.data.message);
    }
    
    return Promise.reject(error);
  }
);

export default axios;