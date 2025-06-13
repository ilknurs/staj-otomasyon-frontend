// src/components/Login.js
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon
} from '@mui/icons-material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  
  const { login, loading, error, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Role-based redirect path'i memoize et
  const getRedirectPath = useMemo(() => {
    if (!isAuthenticated || !user?.role) return '/dashboard';
    
    const dashboardRoutes = {
      admin: '/admin-dashboard',
      student: '/student-dashboard', 
      company: '/company-dashboard',
      supervisor: '/supervisor-dashboard',
      department: '/department-dashboard'
    };
    
    return dashboardRoutes[user.role] || '/dashboard';
  }, [isAuthenticated, user?.role]);

  // Zaten giriş yapılmışsa yönlendir - ROLE-BASED YÖNLENDİRME
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Redirecting to:', getRedirectPath);
      navigate(getRedirectPath, { replace: true });
    }
  }, [isAuthenticated, user]); // user da eklendi role-based routing için

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email adresi zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Geçerli bir email adresi giriniz';
    }
    
    if (!formData.password) {
      errors.password = 'Şifre zorunludur';
    } else if (formData.password.length < 6) {
      errors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Remember me functionality
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Login başarılı - Auth context otomatik olarak yönlendirecek
      console.log('Login successful, role:', result.role);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []); // Bu dependency array boş olmalı, sadece mount'ta çalışmalı

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3
        }}
      >
        <Paper elevation={8} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Box textAlign="center" mb={3}>
            <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Giriş Yap
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Staj Yönetim Sistemi
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email Adresi"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              autoComplete="email"
              autoFocus
            />

            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="current-password"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  color="primary"
                />
              }
              label="Beni hatırla"
              sx={{ mt: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Giriş Yap'
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;