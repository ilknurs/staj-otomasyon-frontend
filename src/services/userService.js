// src/services/userService.js
import api from './api';

class UserService {
  // Kullanıcı bilgisi alma (Admin only)
  async getUser(userId) {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Kullanıcı güncelleme (Admin only)
  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Kullanıcı silme (Admin only)
  async deleteUser(userId) {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Tüm kullanıcıları listeleme (Admin only)
  async getAllUsers(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/users?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Kullanıcı rolüne göre filtreleme
  async getUsersByRole(role) {
    try {
      const response = await api.get(`/users?role=${role}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new UserService();