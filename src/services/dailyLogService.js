import api from './api';

class DailyLogService {
  async getAllDailyLogs(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/daily-logs?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getDailyLog(logId) {
    try {
      const response = await api.get(`/daily-logs/${logId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createDailyLog(logData) {
    try {
      const response = await api.post('/daily-logs', logData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateDailyLog(logId, logData) {
    try {
      const response = await api.put(`/daily-logs/${logId}`, logData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deleteDailyLog(logId) {
    try {
      const response = await api.delete(`/daily-logs/${logId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getStudentDailyLogs(studentId = null) {
    try {
      const url = studentId ? `/daily-logs/student/${studentId}` : '/daily-logs/my-logs';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new DailyLogService();
