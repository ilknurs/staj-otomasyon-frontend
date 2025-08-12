import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext'ten login fonksiyonunu kullan

  const handleChange = e => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData);
      console.log('✅ Login successful:', response);

      const { user } = response;
      
      // Role'a göre yönlendir
      let target;
      switch (user.role) {
        case 'admin':
          target = '/admin-dashboard';
          break;
        case 'student':
          target = '/student-dashboard';
          break;
        case 'company':
          target = '/company-dashboard';
          break;
        case 'supervisor':
          target = '/supervisor-dashboard';
          break;
        case 'department':
          target = '/department-dashboard';
          break;
        default:
          throw new Error('Geçersiz kullanıcı rolü');
      }
      
      console.log('→ Navigating to', target);
      navigate(target, { replace: true });

    } catch (err) {
      console.error('🚨 Login error:', err);
      setError(err.message || 'Giriş yapılırken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card sx={{ width: '100%', mt: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography 
              component="h1" 
              variant="h4" 
              align="center" 
              gutterBottom
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              Giriş Yap
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-posta Adresi"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Şifre"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
                disabled={loading}
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;