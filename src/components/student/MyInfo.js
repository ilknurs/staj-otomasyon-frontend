// src/components/student/MyInfo.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const MyInfo = () => {
  const { user } = useAuth();
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Öğrenci bilgilerini API'den çek
  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (!user?.id) {
        setError('Kullanıcı bilgisi bulunamadı');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/students/profile/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setStudentInfo(data.student);
        } else {
          throw new Error(data.message || 'Öğrenci bilgileri alınamadı');
        }
      } catch (err) {
        console.error('Öğrenci bilgileri alınırken hata:', err);
        setError(err.message || 'Öğrenci bilgileri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, [user?.id]);

  // Profil düzenleme işlevi
  const handleEditProfile = () => {
    // Bu fonksiyon daha sonra profil düzenleme modalı açabilir
    alert('Profil düzenleme özelliği yakında eklenecek');
  };

  // Bilgi yenileme işlevi
  const handleRefresh = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/students/profile/${user.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setStudentInfo(data.student);
      } else {
        throw new Error(data.message || 'Öğrenci bilgileri alınamadı');
      }
    } catch (err) {
      console.error('Bilgiler yenilenirken hata:', err);
      setError(err.message || 'Bilgiler yenilenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bilgilerim</h2>
          <p className="text-gray-600">Kişisel bilgilerinizi görüntüleyebilirsiniz.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Yenile
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={handleRefresh}
            className="text-red-600 hover:text-red-800 underline text-sm"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Bilgiler yükleniyor...</span>
        </div>
      ) : studentInfo ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <p className="text-lg text-gray-900">
                {`${studentInfo.firstName || ''} ${studentInfo.lastName || ''}`.trim() || 'Belirtilmemiş'}
              </p>
            </div>

            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <p className="text-lg text-gray-900">
                {studentInfo.email || 'Belirtilmemiş'}
              </p>
            </div>

            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Öğrenci Numarası
              </label>
              <p className="text-lg text-gray-900 font-mono">
                {studentInfo.studentNumber || studentInfo.id || 'Belirtilmemiş'}
              </p>
            </div>

            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bölüm
              </label>
              <p className="text-lg text-gray-900">
                {studentInfo.department || 'Belirtilmemiş'}
              </p>
            </div>

            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sınıf
              </label>
              <p className="text-lg text-gray-900">
                {studentInfo.grade ? `${studentInfo.grade}. Sınıf` : 'Belirtilmemiş'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <p className="text-lg text-gray-900">
                {studentInfo.phone || 'Belirtilmemiş'}
              </p>
            </div>

            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doğum Tarihi
              </label>
              <p className="text-lg text-gray-900">
                {studentInfo.birthDate ? new Date(studentInfo.birthDate).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
              </p>
            </div>

            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <p className="text-lg text-gray-900">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Öğrenci
                </span>
              </p>
            </div>

            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kayıt Tarihi
              </label>
              <p className="text-lg text-gray-900">
                {studentInfo.createdAt ? new Date(studentInfo.createdAt).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
              </p>
            </div>

            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durum
              </label>
              <p className="text-lg text-gray-900">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  studentInfo.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : studentInfo.status === 'inactive'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {studentInfo.status === 'active' ? 'Aktif' : 
                   studentInfo.status === 'inactive' ? 'Pasif' : 
                   studentInfo.status || 'Belirtilmemiş'}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">Öğrenci bilgileri bulunamadı</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {studentInfo && (
        <div className="mt-8 pt-6 border-t flex gap-4">
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleEditProfile}
          >
            Profili Düzenle
          </button>
          <button 
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={handleRefresh}
          >
            Bilgileri Yenile
          </button>
        </div>
      )}
    </div>
  );
};

export default MyInfo;