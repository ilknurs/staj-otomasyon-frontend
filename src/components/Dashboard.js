import React from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid,
  Chip
} from '@mui/material';
import { 
  Person as PersonIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';

const Dashboard = ({ user, onLogout }) => {
  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return <AdminIcon />;
      case 'student': return <SchoolIcon />;
      case 'company': return <BusinessIcon />;
      case 'supervisor': return <PersonIcon />;
      default: return <PersonIcon />;
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'error';
      case 'student': return 'primary';
      case 'company': return 'success';
      case 'supervisor': return 'warning';
      default: return 'default';
    }
  };

  const getRoleText = (role) => {
    switch(role) {
      case 'admin': return 'Yönetici';
      case 'student': return 'Öğrenci';
      case 'company': return 'Şirket';
      case 'supervisor': return 'Danışman';
      default: return role;
    }
  };

  return (
    <Box>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Staj Yönetim Sistemi
          </Typography>
          <Chip 
            icon={getRoleIcon(user.role)}
            label={getRoleText(user.role)}
            color={getRoleColor(user.role)}
            sx={{ mr: 2, color: 'white' }}
          />
          <Typography sx={{ mr: 2 }}>
            {user.name} {user.surname}
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Çıkış
          </Button>
        </Toolbar>
      </AppBar>

      {/* Ana İçerik */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Hoş Geldiniz, {user.name}!
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Kullanıcı Bilgileri
                </Typography>
                <Typography><strong>Ad Soyad:</strong> {user.name} {user.surname}</Typography>
                <Typography><strong>E-mail:</strong> {user.email}</Typography>
                <Typography><strong>Rol:</strong> {getRoleText(user.role)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Hızlı Erişim
                </Typography>
                {user.role === 'student' && (
                  <>
                    <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                      Günlük Log Ekle
                    </Button>
                    <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                      Staj Durumu
                    </Button>
                  </>
                )}
                {user.role === 'supervisor' && (
                  <>
                    <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                      Öğrenci Listesi
                    </Button>
                    <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                      Değerlendirmeler
                    </Button>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                      Tüm Öğrenciler
                    </Button>
                    <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                      Şirketler
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;