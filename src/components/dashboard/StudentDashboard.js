import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  Toolbar,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Assignment,
  Schedule,
  Grade,
  ExitToApp,
  PlayArrow,
  CheckCircle,
  AccessTime
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState({});
  const [exams, setExams] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const [profileResponse, examsResponse, gradesResponse] = await Promise.all([
        axios.get('/api/student/profile'),
        axios.get('/api/student/exams'),
        axios.get('/api/student/grades')
      ]);
      
      setStudentInfo(profileResponse.data);
      setExams(examsResponse.data);
      setGrades(gradesResponse.data);
    } catch (error) {
      console.error('Öğrenci verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const getExamStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="success" />;
      case 'in-progress':
        return <PlayArrow color="primary" />;
      default:
        return <AccessTime color="warning" />;
    }
  };

  const getExamStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'in-progress':
        return 'Devam Ediyor';
      default:
        return 'Bekliyor';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Öğrenci Paneli - {studentInfo.name}
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
            Çıkış Yap
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Öğrenci Bilgileri */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Öğrenci Bilgileri
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ad Soyad: {studentInfo.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Öğrenci No: {studentInfo.studentNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Bölüm: {studentInfo.department}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  E-posta: {studentInfo.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Genel Ortalama
                </Typography>
                <Typography variant="h3" color="primary" gutterBottom>
                  {studentInfo.gpa || '0.00'}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(studentInfo.gpa || 0) * 25} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tamamlanan Sınav
                </Typography>
                <Typography variant="h3" color="success.main">
                  {exams.filter(exam => exam.status === 'completed').length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Toplam {exams.length} sınavdan
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Sınavlar ve Notlar */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sınavlarım
                </Typography>
                <List>
                  {exams.map((exam) => (
                    <ListItem key={exam.id} divider>
                      <ListItemIcon>
                        {getExamStatusIcon(exam.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={exam.title}
                        secondary={`${exam.course} - ${exam.date}`}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Chip 
                          label={getExamStatusText(exam.status)}
                          color={exam.status === 'completed' ? 'success' : 
                                 exam.status === 'in-progress' ? 'primary' : 'warning'}
                          size="small"
                        />
                        {exam.status === 'pending' && (
                          <Button 
                            size="small" 
                            variant="contained" 
                            sx={{ mt: 1 }}
                            onClick={() => navigate(`/exam/${exam.id}`)}
                          >
                            Sınava Başla
                          </Button>
                        )}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Son Notlarım
                </Typography>
                <List>
                  {grades.map((grade) => (
                    <ListItem key={grade.id} divider>
                      <ListItemIcon>
                        <Grade color={grade.score >= 70 ? 'success' : grade.score >= 50 ? 'warning' : 'error'} />
                      </ListItemIcon>
                      <ListItemText
                        primary={grade.examTitle}
                        secondary={`${grade.course} - ${grade.date}`}
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography 
                          variant="h6" 
                          color={grade.score >= 70 ? 'success.main' : 
                                 grade.score >= 50 ? 'warning.main' : 'error.main'}
                        >
                          {grade.score}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          / 100
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentDashboard;