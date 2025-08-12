// src/components/dashboard/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Paper,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import {
  ExitToApp,
  BarChart,
  Person,
  Schedule,
  Assignment,
  CheckCircle,
  CalendarToday,
  TrendingUp,
  EmojiEvents,
  Flag,
  MenuBook
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import StudentInfo from '../student/StudentInfo';
import AttendanceView from '../student/AttendanceView';

// Tab Panel bileşeni
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Stats Card bileşeni
function StatsCard({ title, value, subtitle, icon: Icon, color = 'primary' }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ color: `${color}.main`, mr: 1 }} />
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // State'ler - Başlangıç değerleri ile
  const [studentData, setStudentData] = useState({
    studentInfo: {
      tc_no: '',
      ad: '',
      soyad: '',
      universite: '',
      bolum: '',
      sinif: '',
      staj_baslangic_tarihi: null,
      staj_bitis_tarihi: null
    },
    dashboardStats: {
      tamamlanan_gun: 0,
      toplam_gun: 0,
      devam_orani: 0,
      ortalama_puan: 0
    },
    recentLogs: []
  });

  // Öğrenci ID'sini almak - güvenli şekilde
  const studentId = localStorage.getItem('studentId') || localStorage.getItem('userId') || '1';

  // API'den veri çekme
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API endpoint'ini kontrol et
      const apiUrl = `http://localhost:5000/api/student/dashboard/${studentId}`;
      console.log('API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Token varsa ekle
          ...(localStorage.getItem('token') && {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          })
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token geçersiz, login'e yönlendir
          handleLogout();
          return;
        }
        throw new Error(`API Hatası: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Student data:', data);
      
      // Veri yapısını kontrol et ve güvenli şekilde set et
      setStudentData({
        studentInfo: {
          tc_no: data.studentInfo?.tc_no || '',
          ad: data.studentInfo?.ad || '',
          soyad: data.studentInfo?.soyad || '',
          universite: data.studentInfo?.universite || '',
          bolum: data.studentInfo?.bolum || '',
          sinif: data.studentInfo?.sinif || '',
          staj_baslangic_tarihi: data.studentInfo?.staj_baslangic_tarihi || null,
          staj_bitis_tarihi: data.studentInfo?.staj_bitis_tarihi || null
        },
        dashboardStats: {
          tamamlanan_gun: data.dashboardStats?.tamamlanan_gun || 0,
          toplam_gun: data.dashboardStats?.toplam_gun || 0,
          devam_orani: data.dashboardStats?.devam_orani || 0,
          ortalama_puan: data.dashboardStats?.ortalama_puan || 0
        },
        recentLogs: Array.isArray(data.recentLogs) ? data.recentLogs : []
      });
      
    } catch (error) {
      console.error('API Error:', error);
      setError(error.message);
      
      // Test verisi ile devam et (geliştirme amaçlı)
      if (process.env.NODE_ENV === 'development') {
        console.log('Test verisi kullanılıyor...');
        setStudentData({
          studentInfo: {
            tc_no: '12345678901',
            ad: 'Test',
            soyad: 'Öğrenci',
            universite: 'Test Üniversitesi',
            bolum: 'Bilgisayar Mühendisliği',
            sinif: '3',
            staj_baslangic_tarihi: '2024-06-01',
            staj_bitis_tarihi: '2024-07-31'
          },
          dashboardStats: {
            tamamlanan_gun: 15,
            toplam_gun: 30,
            devam_orani: 85,
            ortalama_puan: 8.5
          },
          recentLogs: [
            {
              aktivite: 'Web Geliştirme',
              tarih: '2024-07-01',
              saat: 8
            }
          ]
        });
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentId');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Yükleniyor durumu
  if (loading) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Öğrenci Paneli
            </Typography>
            <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
              Çıkış Yap
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ mr: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Veriler yükleniyor...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  // Hata durumu
  if (error && process.env.NODE_ENV !== 'development') {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Öğrenci Paneli
            </Typography>
            <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
              Çıkış Yap
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Alert 
            severity="error" 
            action={
              <Button color="inherit" size="small" onClick={fetchStudentData}>
                Tekrar Dene
              </Button>
            }
          >
            Hata: {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  const { studentInfo, dashboardStats, recentLogs } = studentData;
  const studentName = `${studentInfo.ad} ${studentInfo.soyad}`.trim() || 'Öğrenci';

  // Sekme tanımları
  const tabs = [
    { label: 'Özet', icon: <BarChart /> },
    { label: 'Bilgilerim', icon: <Person /> },
    { label: 'Devam', icon: <Schedule /> },
    { label: 'Günlük', icon: <Assignment /> },
    { label: 'Değerlendirme', icon: <CheckCircle /> },
  ];

  // Overview içeriği
  const renderOverview = () => {
    const cards = [
      {
        title: 'Tamamlanan Gün',
        value: dashboardStats.tamamlanan_gun || 0,
        subtitle: `/ ${dashboardStats.toplam_gun || 0} gün`,
        icon: CalendarToday,
        color: 'primary'
      },
      {
        title: 'Devam Oranı',
        value: `${Math.round(dashboardStats.devam_orani || 0)}%`,
        subtitle: (dashboardStats.devam_orani || 0) >= 90 ? 'Mükemmel' : 'İyi',
        icon: TrendingUp,
        color: 'success'
      },
      {
        title: 'Ortalama Puan',
        value: (dashboardStats.ortalama_puan || 0).toFixed(1),
        subtitle: '/ 10',
        icon: EmojiEvents,
        color: 'secondary'
      },
      {
        title: 'Kalan Gün',
        value: Math.max(0, (dashboardStats.toplam_gun || 0) - (dashboardStats.tamamlanan_gun || 0)),
        subtitle: 'gün',
        icon: Flag,
        color: 'warning'
      }
    ];

    const progressPercentage = Math.min(100, Math.max(0, dashboardStats.devam_orani || 0));

    return (
      <Box>
        {/* Hata mesajı (development modunda) */}
        {error && process.env.NODE_ENV === 'development' && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            API Hatası: {error} (Test verisi kullanılıyor)
          </Alert>
        )}

        {/* Öğrenci Temel Bilgileri */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Öğrenci Bilgileri
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  T.C. Kimlik No
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentInfo.tc_no || 'Belirtilmemiş'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Ad Soyad
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Üniversite
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentInfo.universite || 'Belirtilmemiş'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Bölüm
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentInfo.bolum || 'Belirtilmemiş'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Sınıf
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentInfo.sinif || 'Belirtilmemiş'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Staj Dönemi
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentInfo.staj_baslangic_tarihi && studentInfo.staj_bitis_tarihi ? (
                    <>
                      {new Date(studentInfo.staj_baslangic_tarihi).toLocaleDateString('tr-TR')} - 
                      {new Date(studentInfo.staj_bitis_tarihi).toLocaleDateString('tr-TR')}
                    </>
                  ) : 'Belirtilmemiş'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Stat Kartları */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatsCard {...card} />
            </Grid>
          ))}
        </Grid>

        {/* İlerleme Çubuğu */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Staj İlerleyişi
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                {dashboardStats.tamamlanan_gun || 0} / {dashboardStats.toplam_gun || 0} gün
              </Typography>
              <Typography variant="body2">
                {Math.round(progressPercentage)}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </CardContent>
        </Card>

        {/* Son Aktiviteler */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Son Aktiviteler
            </Typography>
            {recentLogs && recentLogs.length > 0 ? (
              <List>
                {recentLogs.map((log, idx) => (
                  <ListItem key={idx} divider={idx < recentLogs.length - 1}>
                    <ListItemIcon>
                      <MenuBook color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={log.aktivite || 'Aktivite'}
                      secondary={log.tarih ? new Date(log.tarih).toLocaleDateString('tr-TR') : 'Tarih belirtilmemiş'}
                    />
                    <Chip 
                      label={`${log.saat || 0} saat`} 
                      color="primary" 
                      variant="outlined" 
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Henüz aktivite kaydı bulunmuyor.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  };

  // Sekme içeriklerini seç
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderOverview();
      case 1:
        return <StudentInfo studentData={studentInfo} onUpdate={fetchStudentData} />;
      case 2:
        return <AttendanceView studentId={studentId} />;
      case 3:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Günlük raporlar burada görüntülenecek.
            </Typography>
          </Paper>
        );
      case 4:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Değerlendirmeler burada görüntülenecek.
            </Typography>
          </Paper>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Öğrenci Paneli - {studentName}
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
            Çıkış Yap
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Sekme Navigation */}
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {tabs.map((tab, index) => (
              <Tab 
                key={index}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
                sx={{ minHeight: 64 }}
              />
            ))}
          </Tabs>
        </Paper>

        {/* Sekme İçerikleri */}
        {tabs.map((_, index) => (
          <TabPanel key={index} value={activeTab} index={index}>
            {renderTabContent()}
          </TabPanel>
        ))}
      </Container>
    </Box>
  );
}