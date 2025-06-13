// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  Chip,
  Alert,
  Skeleton,
  Container,
  Paper,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  Storage as DataIcon,
  AdminPanelSettings as AdminIcon,
  AccountCircle,
  ExitToApp,
  Dashboard as DashboardIcon,
  TrendingUp,
  School,
  Work
} from '@mui/icons-material';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State Management
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  // Dashboard verilerini fetch et
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/dashboard-stats');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError('Dashboard verileri yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Menu handlers
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Dashboard kartları konfigürasyonu
  const dashboardCards = [
    {
      id: 'users',
      title: 'Kullanıcı Yönetimi',
      description: 'Sistem kullanıcılarını yönetin',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: 'primary',
      path: '/admin/users',
      stats: dashboardData?.totalUsers || 0,
      statsLabel: 'Toplam Kullanıcı'
    },
    {
      id: 'companies',
      title: 'Şirket Yönetimi',
      description: 'Kayıtlı şirketleri yönetin',
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      color: 'success',
      path: '/admin/companies',
      stats: dashboardData?.totalCompanies || 0,
      statsLabel: 'Kayıtlı Şirket'
    },
    {
      id: 'internships',
      title: 'Staj Süreçleri',
      description: 'Tüm staj süreçlerini izleyin',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: 'info',
      path: '/admin/internships',
      stats: dashboardData?.activeInternships || 0,
      statsLabel: 'Aktif Staj'
    },
    {
      id: 'reports',
      title: 'Raporlar',
      description: 'Sistem raporlarını görüntüleyin',
      icon: <ReportIcon sx={{ fontSize: 40 }} />,
      color: 'warning',
      path: '/admin/reports',
      stats: dashboardData?.totalReports || 0,
      statsLabel: 'Oluşturulan Rapor'
    },
    {
      id: 'settings',
      title: 'Sistem Ayarları',
      description: 'Sistem ayarlarını yapılandırın',
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      color: 'secondary',
      path: '/admin/settings',
      stats: null,
      statsLabel: 'Konfigürasyon'
    },
    {
      id: 'data',
      title: 'Veri Yönetimi',
      description: 'Veritabanı işlemlerini yönetin',
      icon: <DataIcon sx={{ fontSize: 40 }} />,
      color: 'error',
      path: '/admin/data-management',
      stats: null,
      statsLabel: 'Veri İşlemleri'
    }
  ];

  // Loading skeleton
  if (loading) {
    return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <AdminIcon sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Yönetici Paneli
            </Typography>
            <Skeleton variant="circular" width={40} height={40} />
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <AdminIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yönetici Paneli
          </Typography>
          
          <Chip
            icon={<AdminIcon />}
            label="Yönetici"
            color="error"
            variant="outlined"
            sx={{ mr: 2, color: 'white', borderColor: 'white' }}
          />
          
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuClick}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              {user?.name?.charAt(0)}
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profil" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Çıkış Yap" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section */}
        <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Typography variant="h4" gutterBottom>
            Hoş Geldiniz, {user?.name} {user?.surname}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Staj yönetim sistemi yönetici paneline hoş geldiniz. 
            Buradan tüm sistem işlemlerini gerçekleştirebilirsiniz.
          </Typography>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Quick Stats */}
        {dashboardData && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <School sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" color="primary">
                  {dashboardData.totalStudents || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Toplam Öğrenci
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Work sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" color="success.main">
                  {dashboardData.activeInternships || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Aktif Stajlar
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <BusinessIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" color="info.main">
                  {dashboardData.totalCompanies || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kayıtlı Şirket
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" color="warning.main">
                  {dashboardData.completionRate || 0}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tamamlanma Oranı
                </Typography>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Dashboard Cards */}
        <Grid container spacing={3}>
          {dashboardCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: `${card.color}.main`, mr: 2 }}>
                      {card.icon}
                    </Box>
                    <Typography variant="h6" component="h2">
                      {card.title}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {card.description}
                  </Typography>
                  
                  {card.stats !== null && (
                    <Box sx={{ mt: 'auto' }}>
                      <Typography variant="h4" color={`${card.color}.main`}>
                        {card.stats}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {card.statsLabel}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                
                <CardActions>
                  <Button
                    size="small"
                    color={card.color}
                    variant="contained"
                    fullWidth
                    onClick={() => handleNavigation(card.path)}
                    startIcon={<DashboardIcon />}
                  >
                    Yönet
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;