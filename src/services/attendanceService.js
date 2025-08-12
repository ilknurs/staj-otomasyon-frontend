// src/services/attendanceService.js
import api from './api';

class AttendanceService {
  async getAllAttendances(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/attendances?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getAttendance(attendanceId) {
    try {
      const response = await api.get(`/attendances/${attendanceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createAttendance(attendanceData) {
    try {
      const response = await api.post('/attendances', attendanceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateAttendance(attendanceId, attendanceData) {
    try {
      const response = await api.put(`/attendances/${attendanceId}`, attendanceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deleteAttendance(attendanceId) {
    try {
      const response = await api.delete(`/attendances/${attendanceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }



 
  
  async getStudentAttendances(studentId = null) {
    try {
      const url = studentId ? `/attendances/student/${studentId}` : '/attendances/my-attendances';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async markAttendance(attendanceData) {
    try {
      const response = await api.post('/attendances/mark', attendanceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new AttendanceService();