// src/components/StudentDashboard.js
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
  ListItemText,
  LinearProgress,
  List,
  ListItem,
  ListItemText as MuiListItemText,
  Badge
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Assessment as EvaluationIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  AccountCircle,
  ExitToApp,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  //CalendarTodayIcon,
  CheckCircle,
  PendingActions,
  Timeline
} from '@mui/icons-material';

const StudentDashboard = () => {
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
      const response = await axios.get('/api/student/dashboard-data');
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
  //const handleNavigation = (path) => {
  //  navigate(path);
 // };

  // Dashboard kartları konfigürasyonu
  const dashboardCards = [
    {
      id: 'application',
      title: 'Staj Başvurum',
      description: 'Staj başvuru durumunuzu kontrol edin',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: 'primary',
      path: '/student/applications',
      actions: [
        { label: 'Başvuruları Görüntüle', action: () => navigate('/student/applications'), icon: <ViewIcon /> },
        { label: 'Yeni Başvuru', action: () => navigate('/student/apply'), icon: <AddIcon /> }
      ]
    },
    {
      id: 'diary',
      title: 'Staj Defteri',
      description: 'Günlük staj raporlarınızı yönetin',
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      color: 'success',
      path: '/student/diary',
      actions: [
        { label: 'Defteri Aç', action: () => navigate('/student/diary'), icon: <ViewIcon /> },
        { label: 'Günlük Ekle', action: () => navigate('/student/daily-log'), icon: <AddIcon /> }
      ]
    },
    {
      id: 'evaluations',
      title: 'Değerlendirmeler',
      description: 'Staj değerlendirmelerinizi görün',
      icon: <EvaluationIcon sx={{ fontSize: 40 }} />,
      color: 'info',
      path: '/student/evaluations',
      actions: [
        { label: 'Değerlendirmeleri Gör', action: () => navigate('/student/evaluations'), icon: <ViewIcon /> }
      ]
    },
    {
      id: 'profile',
      title: 'Profil Ayarları',
      description: 'Kişisel bilgilerinizi güncelleyin',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      color: 'secondary',
      path: '/student/profile',
      actions: [
        { label: 'Profili Düzenle', action: () => navigate('/student/profile'), icon: <EditIcon /> }
      ]
    }
  ];

  // Loading skeleton
  if (loading) {
    return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Öğrenci Paneli
            </Typography>
            <Skeleton variant="circular" width={40} height={40} />
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Skeleton variant="rectangular" height={250} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  // Staj durumu hesaplama
  const getInternshipStatus = () => {
    if (!dashboardData?.currentInternship) return null;
    
    const { startDate, endDate, completedDays, totalDays } = dashboardData.currentInternship;
    const progress = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
    
    return {
      progress: Math.min(progress, 100),
      completedDays,
      totalDays,
      startDate,
      endDate,
      isActive: progress < 100 && new Date() >= new Date(startDate),
      isCompleted: progress >= 100
    };
  };

  const internshipStatus = getInternshipStatus();

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Öğrenci Paneli
          </Typography>
          
          <Chip
            icon={<SchoolIcon />}
            label="Öğrenci"
            color="primary"
            variant="outlined"
            sx={{ mr: 2, color: 'white', borderColor: 'white' }}
          />
          
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuClick}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
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
            <MenuItem onClick={() => navigate('/student/profile')}>
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
            Hoş Geldin, {user?.name} {user?.surname}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Staj sürecinizi takip edebilir, günlük raporlarınızı ekleyebilir ve değerlendirmelerinizi görüntüleyebilirsiniz.
          </Typography>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Staj Durumu */}
        {internshipStatus && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Timeline sx={{ mr: 1 }} />
              Mevcut Staj Durumu
              {internshipStatus.isCompleted && (
                <Chip 
                  label="Tamamlandı" 
                  color="success" 
                  size="small" 
                  icon={<CheckCircle />} 
                  sx={{ ml: 2 }} 
                />
              )}
              {internshipStatus.isActive && (
                <Chip 
                  label="Aktif" 
                  color="primary" 
                  size="small" 
                  icon={<PendingActions />} 
                  sx={{ ml: 2 }} 
                />
              )}
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={8}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  İlerleme: {internshipStatus.completedDays} / {internshipStatus.totalDays} gün
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={internshipStatus.progress} 
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  %{internshipStatus.progress.toFixed(1)} tamamlandı
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2">
                  <strong>Başlangıç:</strong> {new Date(internshipStatus.startDate).toLocaleDateString('tr-TR')}
                </Typography>
                <Typography variant="body2">
                  <strong>Bitiş:</strong> {new Date(internshipStatus.endDate).toLocaleDateString('tr-TR')}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Son Aktiviteler */}
        {dashboardData?.recentActivities && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Son Aktiviteler
            </Typography>
            <List>
              {dashboardData.recentActivities.slice(0, 3).map((activity, index) => (
                <ListItem key={index} divider={index < 2}>
                  <ListItemIcon>
                    
                  </ListItemIcon>
                  <MuiListItemText
                    primary={activity.title}
                    secondary={new Date(activity.date).toLocaleDateString('tr-TR')}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* Dashboard Cards */}
        <Grid container spacing={3}>
          {dashboardCards.map((card) => (
            <Grid item xs={12} sm={6} key={card.id}>
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
                </CardContent>
                
                <CardActions sx={{ flexDirection: 'column', gap: 1, p: 2 }}>
                  {card.actions.map((action, index) => (
                    <Button
                      key={index}
                      size="small"
                      color={card.color}
                      variant={index === 0 ? "contained" : "outlined"}
                      fullWidth
                      onClick={action.action}
                      startIcon={action.icon}
                    >
                      {action.label}
                    </Button>
                  ))}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentDashboard;