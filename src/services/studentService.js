// src/services/studentService.js
import api from './api';

class StudentService {
  // Tüm öğrencileri listeleme
  async getAllStudents(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/students?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Öğrenci bilgisi alma
  async getStudent(studentId) {
    try {
      const response = await api.get(`/students/${studentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Öğrenci oluşturma
  async createStudent(studentData) {
    try {
      const response = await api.post('/students', studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Öğrenci güncelleme
  async updateStudent(studentId, studentData) {
    try {
      const response = await api.put(`/students/${studentId}`, studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Öğrenci silme
  async deleteStudent(studentId) {
    try {
      const response = await api.delete(`/students/${studentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Öğrenci profil güncelleme
  async updateProfile(profileData) {
    try {
      const response = await api.put('/students/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Öğrencinin staj bilgileri
  async getStudentInternships(studentId = null) {
    try {
      const url = studentId ? `/students/${studentId}/internships` : '/students/my-internships';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Bölüme göre öğrenciler
  async getStudentsByDepartment(departmentId) {
    try {
      const response = await api.get(`/students?department=${departmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new StudentService();