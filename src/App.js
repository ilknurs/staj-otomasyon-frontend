import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Auth & Layout
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AdminDashboard from './components/dashboard/AdminDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';
import CompanyDashboard from './components/dashboard/CompanyDashboard';
import SupervisorDashboard from './components/dashboard/SupervisorDashboard';
import DepartmentDashboard from './components/dashboard/DepartmentDashboard';


// Theme
const theme = createTheme({
  palette: {
    primary:   { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

// Tek satırda token+role kontrolü
const ProtectedRoute = ({ children, requiredRole }) => {
  const token    = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token)                           return <Navigate to="/login" replace />;
  if (requiredRole && userRole !== requiredRole)
                                        return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login"    element={<Login />} />
          

          {/* Protected */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/company-dashboard" 
            element={
              <ProtectedRoute requiredRole="company">
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/supervisor-dashboard" 
            element={
              <ProtectedRoute requiredRole="supervisor">
                <SupervisorDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/department-dashboard" 
            element={
              <ProtectedRoute requiredRole="department">
                <DepartmentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default & Catch-all */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
