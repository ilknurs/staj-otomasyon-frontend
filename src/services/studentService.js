// src/services/studentService.js
import axios from '../utils/axiosConfig';

const studentBase = '/api/students';

/** Öğrenci kendi profili */
export async function getProfile() {
  try {
    const res = await axios.get(`${studentBase}/profile`);
    return res.data.data;
  } catch (error) {
    console.error('Profil getirme hatası:', error);
    if (error.response?.status === 401) {
      throw new Error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
    }
    throw error;
  }
}

export async function updateProfile(data) {
  try {
    const res = await axios.put(`${studentBase}/profile`, data);
    return res.data.data;
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    throw error;
  }
}

/** Tercihler */
export async function fetchPreferences() {
  try {
    const res = await axios.get(`${studentBase}/preferences`);
    return res.data.data;
  } catch (error) {
    console.error('Tercihler getirme hatası:', error);
    throw error;
  }
}

export async function setPreferences(preferences) {
  try {
    const res = await axios.post(
      `${studentBase}/preferences`,
      { preferences }
    );
    return res.data.data;
  } catch (error) {
    console.error('Tercihler kaydetme hatası:', error);
    throw error;
  }
}

/** Dönem Başı */
export async function fetchAssignments() {
  try {
    const res = await axios.get(`${studentBase}/assignments`);
    return res.data.data;
  } catch (error) {
    console.error('Atamalar getirme hatası:', error);
    throw error;
  }
}

export async function setAssignmentType(aid, type) {
  try {
    const res = await axios.patch(
      `${studentBase}/assignments/${aid}/type`,
      { type }
    );
    return res.data.data;
  } catch (error) {
    console.error('Atama tipi güncelleme hatası:', error);
    throw error;
  }
}

/** Günlük Günlükler */
export async function fetchLogs(aid) {
  try {
    const res = await axios.get(`${studentBase}/assignments/${aid}/logs`);
    return res.data.data;
  } catch (error) {
    console.error('Günlükler getirme hatası:', error);
    throw error;
  }
}

export async function addLog(aid, entry) {
  try {
    const res = await axios.post(
      `${studentBase}/assignments/${aid}/logs`,
      entry
    );
    return res.data.data;
  } catch (error) {
    console.error('Günlük ekleme hatası:', error);
    throw error;
  }
}

/** Devam Bilgileri */
export async function fetchAttendance() {
  try {
    const res = await axios.get(`${studentBase}/attendance`);
    return res.data.data;
  } catch (error) {
    console.error('Devam bilgileri getirme hatası:', error);
    throw error;
  }
}

/** Dönem Sonu Not & Rapor */
export async function fetchGrades() {
  try {
    const res = await axios.get(`${studentBase}/grades`);
    return res.data.data;
  } catch (error) {
    console.error('Notlar getirme hatası:', error);
    throw error;
  }
}
export async function fetchCompanies() {
  try {
    const res = await axios.get(`${studentBase}/companies`);
    return res.data.data;
  } catch (error) {
    console.error('Şirketler getirme hatası:', error);
    throw error;
  }
}