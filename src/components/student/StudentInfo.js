// src/components/student/StudentInfo.js
import React, { useState, useEffect } from 'react';
import { Edit, Save, X, Loader2 } from 'lucide-react';

export default function StudentInfo({ studentData = {}, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [allFields, setAllFields] = useState({});

  const studentId = localStorage.getItem('studentId') || '1';

  useEffect(() => {
    if (isEditing) {
      fetchAllFields();
    }
  }, [isEditing]);

  const fetchAllFields = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/student/fields/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAllFields(data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Tüm alanlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const fieldDefinitions = [
    { section: 'Kişisel Bilgiler', fields: [
      { key: 'tc_no', label: 'T.C. Kimlik No', type: 'text', readonly: true },
      { key: 'ad', label: 'Ad', type: 'text' },
      { key: 'soyad', label: 'Soyad', type: 'text' },
      { key: 'dogum_tarihi', label: 'Doğum Tarihi', type: 'date' },
      { key: 'telefon', label: 'Telefon', type: 'tel' },
      { key: 'email', label: 'E-posta', type: 'email' },
      { key: 'adres', label: 'Adres', type: 'textarea' },
    ]},
    { section: 'Eğitim Bilgileri', fields: [
      { key: 'universite', label: 'Üniversite', type: 'text' },
      { key: 'bolum', label: 'Bölüm', type: 'text' },
      { key: 'sinif', label: 'Sınıf', type: 'number' },
      { key: 'gpa', label: 'Not Ortalaması', type: 'number', step: '0.01' },
    ]},
    { section: 'Staj Bilgileri', fields: [
      { key: 'staj_baslangic_tarihi', label: 'Staj Başlangıç', type: 'date' },
      { key: 'staj_bitis_tarihi', label: 'Staj Bitiş', type: 'date' },
      { key: 'mentor_ad', label: 'Mentor', type: 'text' },
      { key: 'department', label: 'Departman', type: 'text' },
    ]},
    { section: 'Ek Bilgiler', fields: [
      { key: 'alan1', label: 'Programlama Dilleri', type: 'text' },
      { key: 'alan2', label: 'Veritabanı Bilgisi', type: 'text' },
      { key: 'alan3', label: 'Web Teknolojileri', type: 'text' },
      { key: 'alan4', label: 'Mobil Geliştirme', type: 'text' },
      { key: 'alan5', label: 'Cloud Teknolojileri', type: 'text' },
      { key: 'alan6', label: 'DevOps Araçları', type: 'text' },
      { key: 'alan7', label: 'Proje Yönetimi', type: 'text' },
      { key: 'alan8', label: 'UI/UX Deneyimi', type: 'text' },
      { key: 'alan9', label: 'Test Yazma', type: 'text' },
      { key: 'alan10', label: 'API Geliştirme', type: 'text' },
      { key: 'alan11', label: 'Machine Learning', type: 'text' },
      { key: 'alan12', label: 'Data Analysis', type: 'text' },
      { key: 'alan36', label: 'Diğer Yetenekler', type: 'textarea' },
    ]},
  ];

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/student/${studentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsEditing(false);
        onUpdate && onUpdate();
        alert('Bilgiler başarıyla güncellendi!');
      } else {
        throw new Error('Güncelleme başarısız');
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('Kaydetme işlemi başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(allFields);
  };

  if (loading && isEditing) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600 font-medium">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gray-50 p-6 rounded-lg">
      {/* Başlık ve Düzenle Butonu */}
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center border-b-4 border-blue-600">
        <h2 className="text-2xl font-bold text-gray-800">Öğrenci Bilgileri</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Edit className="h-4 w-4" />
            Düzenle
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
            >
              <X className="h-4 w-4" />
              İptal
            </button>
          </div>
        )}
      </div>

      {/* Form Alanları */}
      {fieldDefinitions.map((section, sectionIdx) => (
        <div
          key={sectionIdx}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-5 text-gray-800 border-b-2 border-blue-500 pb-2">
            {section.section}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.fields.map((field) => {
              const value = isEditing
                ? formData[field.key] || ''
                : studentData[field.key] || '';

              return (
                <div key={field.key} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-600">
                    {field.label}
                  </label>

                  {isEditing ? (
                    field.type === 'textarea' ? (
                      <textarea
                        value={value}
                        onChange={(e) =>
                          handleInputChange(field.key, e.target.value)
                        }
                        disabled={field.readonly}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={value}
                        onChange={(e) =>
                          handleInputChange(field.key, e.target.value)
                        }
                        disabled={field.readonly}
                        step={field.step}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    )
                  ) : (
                    <p className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md min-h-[40px] flex items-center text-gray-700">
                      {field.type === 'date' && value
                        ? new Date(value).toLocaleDateString('tr-TR')
                        : value || '-'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
