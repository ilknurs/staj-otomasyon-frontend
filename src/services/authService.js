// src/services/authService.js
import api from './api';

const authService = {
  // Giriş yapma
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  },

  // Kayıt olma
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Register service error:', error);
      throw error;
    }
  },

  // Çıkış yapma
  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout service error:', error);
      // Logout hatası önemli değil, localStorage'ı temizleyeceğiz
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
    }
  },

  // Profil bilgilerini getir (geçici olarak devre dışı)
  getProfile: async () => {
    try {
      // Önce localStorage'dan dene
      const user = localStorage.getItem('user');
      if (user) {
        return { data: JSON.parse(user) };
      }
      
      // API çağrısı (eğer endpoint varsa)
      // const response = await api.get('/auth/profile');
      // return response.data;
      
      throw new Error('Profil bilgileri bulunamadı');
    } catch (error) {
      console.error('Get profile service error:', error);
      // Hata durumunda localStorage'dan bilgileri döndür
      const user = localStorage.getItem('user');
      if (user) {
        return { data: JSON.parse(user) };
      }
      throw error;
    }
  },

  // Token doğrulama
  validateToken: async () => {
    try {
      const response = await api.get('/auth/validate');
      return response.data;
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  },

  // Profil güncelleme
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      
      // Başarılı güncelleme sonrası localStorage'ı güncelle
      const updatedUser = response.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response.data;
    } catch (error) {
      console.error('Update profile service error:', error);
      throw error;
    }
  }
};

export default authService;