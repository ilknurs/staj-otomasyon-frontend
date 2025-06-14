// src/services/internshipService.js
import api from './api';

class InternshipService {
  async getAllInternships(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/internships?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getInternship(internshipId) {
    try {
      const response = await api.get(`/internships/${internshipId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createInternship(internshipData) {
    try {
      const response = await api.post('/internships', internshipData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateInternship(internshipId, internshipData) {
    try {
      const response = await api.put(`/internships/${internshipId}`, internshipData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deleteInternship(internshipId) {
    try {
      const response = await api.delete(`/internships/${internshipId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async applyForInternship(internshipId, applicationData) {
    try {
      const response = await api.post(`/internships/${internshipId}/apply`, applicationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async approveInternship(internshipId) {
    try {
      const response = await api.put(`/internships/${internshipId}/approve`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new InternshipService();
