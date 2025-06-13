// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
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
        <h1>Yönetici Paneli</h1>
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
          <h3>Kullanıcı Yönetimi</h3>
          <p>Sistem kullanıcılarını yönetin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Kullanıcıları Yönet
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Şirket Yönetimi</h3>
          <p>Kayıtlı şirketleri yönetin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
            Şirketleri Yönet
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Staj Süreçleri</h3>
          <p>Tüm staj süreçlerini izleyin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}>
            Süreçleri İzle
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Raporlar</h3>
          <p>Sistem raporlarını görüntüleyin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px' }}>
            Raporları Görüntüle
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Sistem Ayarları</h3>
          <p>Sistem ayarlarını yapılandırın</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
            Ayarları Düzenle
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Veri Yönetimi</h3>
          <p>Veritabanı işlemlerini yönetin</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
            Veri İşlemleri
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;