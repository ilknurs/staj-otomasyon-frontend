// src/services/departmentService.js
import api from './api';

class DepartmentService {
  async getAllDepartments(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/departments?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getDepartment(departmentId) {
    try {
      const response = await api.get(`/departments/${departmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createDepartment(departmentData) {
    try {
      const response = await api.post('/departments', departmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateDepartment(departmentId, departmentData) {
    try {
      const response = await api.put(`/departments/${departmentId}`, departmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deleteDepartment(departmentId) {
    try {
      const response = await api.delete(`/departments/${departmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new DepartmentService();