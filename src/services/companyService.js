// src/services/companyService.js
import api from './api';

class CompanyService {
  async getAllCompanies(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/companies?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getCompany(companyId) {
    try {
      const response = await api.get(`/companies/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createCompany(companyData) {
    try {
      const response = await api.post('/companies', companyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateCompany(companyId, companyData) {
    try {
      const response = await api.put(`/companies/${companyId}`, companyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deleteCompany(companyId) {
    try {
      const response = await api.delete(`/companies/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new CompanyService();