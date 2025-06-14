// src/services/supervisorService.js
import api from './api';

class SupervisorService {
  async getAllSupervisors(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/supervisors?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getSupervisor(supervisorId) {
    try {
      const response = await api.get(`/supervisors/${supervisorId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createSupervisor(supervisorData) {
    try {
      const response = await api.post('/supervisors', supervisorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateSupervisor(supervisorId, supervisorData) {
    try {
      const response = await api.put(`/supervisors/${supervisorId}`, supervisorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deleteSupervisor(supervisorId) {
    try {
      const response = await api.delete(`/supervisors/${supervisorId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getSupervisorStudents(supervisorId = null) {
    try {
      const url = supervisorId ? `/supervisors/${supervisorId}/students` : '/supervisors/my-students';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new SupervisorService();