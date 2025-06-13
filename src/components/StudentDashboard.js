// src/components/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Öğrenci Paneli</h1>
        <div>
          <span style={{ marginRight: '15px' }}>
            Hoş geldin, {user?.name} {user?.surname}
          </span>
          <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
            Çıkış Yap
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Staj Başvurum</h3>
          <p>Staj başvuru durumunuzu kontrol edin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Başvuruları Görüntüle
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Staj Defteri</h3>
          <p>Günlük staj raporlarınızı yönetin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
            Defteri Aç
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Değerlendirmeler</h3>
          <p>Staj değerlendirmelerinizi görün</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}>
            Değerlendirmeleri Gör
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Profil Ayarları</h3>
          <p>Kişisel bilgilerinizi güncelleyin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
            Profili Düzenle
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;