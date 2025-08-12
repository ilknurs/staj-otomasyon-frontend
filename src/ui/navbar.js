// src/ui/Navbar.js
import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1) Token’ı sil
    localStorage.removeItem('token');
    // 2) Login sayfasına yönlendir
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center bg-white h-16 px-6 shadow-md">
      <h1 className="text-xl font-semibold text-gray-800">
        Hoş geldiniz, {userName}
      </h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
      >
        <LogOut className="h-5 w-5" />
        <span>Çıkış</span>
      </button>
    </header>
  );
}
