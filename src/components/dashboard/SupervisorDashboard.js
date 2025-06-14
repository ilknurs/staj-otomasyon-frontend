// src/components/SupervisorDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SupervisorDashboard = () => {
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
        <h1>Danışman Paneli</h1>
        <div>
          <span style={{ marginRight: '15px' }}>
            Hoş geldiniz, {user?.name} {user?.surname}
          </span>
          <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
            Çıkış Yap
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Öğrenci Takibi</h3>
          <p>Danışmanlığını yaptığınız öğrencileri görüntüleyin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Öğrencileri Görüntüle
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Staj Onayları</h3>
          <p>Öğrenci staj başvurularını onaylayın</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
            Onay Bekleyenler
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Staj Defterleri</h3>
          <p>Öğrenci staj defterlerini inceleyin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}>
            Defterleri İncele
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Değerlendirmeler</h3>
          <p>Öğrenci değerlendirmelerini yapın</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px' }}>
            Değerlendirme Yap
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Raporlar</h3>
          <p>Staj süreç raporlarını görüntüleyin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px' }}>
            Raporları Görüntüle
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;