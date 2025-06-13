// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Token kontrolü
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  
  if (!token || !userString) {
    // Giriş yapılmamış, login'e yönlendir
    return <Navigate to="/login" replace />;
  }
  
  try {
    const user = JSON.parse(userString);
    
    // Role kontrolü
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Yetkisiz erişim
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Yetkisiz Erişim</h2>
          <p>Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
          <p>Rolünüz: {user.role}</p>
          <button onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}>
            Çıkış Yap
          </button>
        </div>
      );
    }
    
    // Her şey OK, component'i render et
    return children;
    
  } catch (error) {
    // User data bozuksa login'e yönlendir
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;