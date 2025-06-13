// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Box, 
  CircularProgress, 
  Alert, 
  AlertTitle, 
  Button,
  Container,
  Paper,
  Typography
} from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

const ProtectedRoute = ({ children, allowedRoles, fallbackPath = '/login' }) => {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Loading durumu
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Giriş yapılmamışsa login'e yönlendir
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Role kontrolü
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <LockIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
          
          <Typography variant="h4" gutterBottom color="error">
            Yetkisiz Erişim
          </Typography>
          
          <Alert severity="warning" sx={{ mb: 3 }}>
            <AlertTitle>Erişim Engellendi</AlertTitle>
            Bu sayfaya erişmek için gerekli yetkiniz bulunmamaktadır.
          </Alert>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>Mevcut Rolünüz:</strong> {getRoleText(user.role)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Gerekli Roller:</strong> {allowedRoles.map(getRoleText).join(', ')}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={() => window.history.back()}
            >
              Geri Dön
            </Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={logout}
            >
              Çıkış Yap
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Her şey OK, component'i render et
  return children;
};

// Yardımcı fonksiyon
const getRoleText = (role) => {
  const roleMap = {
    admin: 'Yönetici',
    student: 'Öğrenci',
    company: 'Şirket',
    supervisor: 'Danışman',
    department: 'Bölüm'
  };
  return roleMap[role] || role;
};

export default ProtectedRoute;