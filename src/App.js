// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login.js';
import StudentDashboard from './components/dashboard/StudentDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import DepartmentDashboard from './components/dashboard/DepartmentDashboard';
import CompanyDashboard from './components/dashboard/CompanyDashboard';
import SupervisorDashboard from './components/dashboard/SupervisorDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Axios konfigürasyonunu import et
import './utils/axiosConfig';

// Material-UI teması
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// Dashboard yönlendirme komponenti
function DashboardRedirect() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'student':
      return <Navigate to="/student" replace />;
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'company':
      return <Navigate to="/company" replace />;
    case 'supervisor':
      return <Navigate to="/supervisor" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Ana sayfa - Dashboard'a yönlendirme */}
            <Route path="/" element={<DashboardRedirect />} />
            
            {/* Login sayfası */}
            <Route path="/login" element={<Login />} />
            
            {/* Korumalı rotalar */}
            <Route 
              path="/student/*" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/company/*" 
              element={
                <ProtectedRoute requiredRole="company">
                  <CompanyDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/supervisor/*" 
              element={
                <ProtectedRoute requiredRole="supervisor">
                  <SupervisorDashboard />
                </ProtectedRoute>
              }
              />
              
            <Route 
              path="/department/*" 
              element={
                <ProtectedRoute requiredRole="department">
                  <DepartmentDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* 404 sayfası */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;