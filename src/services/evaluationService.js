// src/services/evaluationService.js
import api from './api';

class EvaluationService {
  async getAllEvaluations(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/evaluations?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getEvaluation(evaluationId) {
    try {
      const response = await api.get(`/evaluations/${evaluationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createEvaluation(evaluationData) {
    try {
      const response = await api.post('/evaluations', evaluationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateEvaluation(evaluationId, evaluationData) {
    try {
      const response = await api.put(`/evaluations/${evaluationId}`, evaluationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deleteEvaluation(evaluationId) {
    try {
      const response = await api.delete(`/evaluations/${evaluationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getStudentEvaluations(studentId = null) {
    try {
      const url = studentId ? `/evaluations/student/${studentId}` : '/evaluations/my-evaluations';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new EvaluationService();