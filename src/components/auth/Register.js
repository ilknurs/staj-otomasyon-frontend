import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
  Container,
  Link as MuiLink
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const roleOptions = [
  { value: 'student',    label: 'Öğrenci'    },
  { value: 'company',    label: 'Şirket'     },
  { value: 'supervisor', label: 'Danışman'   },
  { value: 'department', label: 'Bölüm'      },
];

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', surname: '', email: '', password: '', role: 'student'
  });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  const handleChange = e => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/register', formData);
      console.log('↪️ Register response:', data);
      // Kayıt başarılıysa login sayfasına yönlendir
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('🚨 Register error:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card sx={{ width: '100%', mt: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Hesap Oluştur
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required fullWidth
                id="name" name="name"
                label="Ad"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required fullWidth
                id="surname" name="surname"
                label="Soyad"
                value={formData.surname}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required fullWidth
                id="email" name="email"
                label="E-posta Adresi"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required fullWidth
                id="password" name="password"
                label="Şifre"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                select fullWidth
                id="role" name="role"
                label="Rol"
                value={formData.role}
                onChange={handleChange}
              >
                {roleOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
              </Button>

              <Box textAlign="center">
                <MuiLink component={Link} to="/login" variant="body2">
                  Zaten hesabın var mı? Giriş yap
                </MuiLink>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
