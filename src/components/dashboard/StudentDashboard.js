// src/pages/StudentDashboard.jsx
import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  useTheme
} from '@mui/material';
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
  Edit as EditIcon,
  CheckCircle as CheckIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationIcon
} from '@mui/icons-material';

import DashboardLayout from '../common/DashboardLayout';
import MyInfo from '../student/MyInfo';
import PeriodStart from '../student/PeriodStart';
import Preferences from '../student/Preferences';
import DailyLogs from '../student/DailyLogs';
import AttendanceView from '../student/AttendanceView';
import EndPeriod from '../student/EndPeriod';



const drawerWidth = 280;

const sections = [
  { label: 'Bilgilerim', to: 'info', icon: PersonIcon },
  { label: 'Dönem Başı Seç', to: 'period-start', icon: CalendarIcon },
  { label: 'Tercihlerim', to: 'preferences', icon: BusinessIcon },
  { label: 'Eğitim Günlüğü', to: 'daily-logs', icon: EditIcon },
  { label: 'Devam Bilgilerim', to: 'attendance', icon: CheckIcon },
  { label: 'Not & Rapor', to: 'end-period', icon: AssessmentIcon },
  { label: 'Bildirimler', to: 'notifications', icon: NotificationIcon },
];

export default function StudentDashboard() {
  const theme = useTheme();

  const SidebarContent = () => (
    <Box sx={{ width: drawerWidth, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Sidebar Header */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
          Öğrenci Paneli
        </Typography>
      </Box>

      {/* Navigation List */}
      <List sx={{ flex: 1, p: 1 }}>
        {sections.map(({ label, to, icon: Icon }) => (
          <ListItem key={to} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={`./${to}`}
              sx={{
                borderRadius: 2,
                mx: 1,
                py: 1.5,
                '&.active': {
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Icon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText 
                primary={label}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  

  return (
    <DashboardLayout 
      title="Öğrenci Dashboard"
      subtitle="Staj sürecinizi buradan takip edebilirsiniz"
    >
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 200px)' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'relative',
              height: '100%',
              border: 'none',
              boxShadow: theme.shadows[2]
            },
          }}
        >
          <SidebarContent />
        </Drawer>

        {/* Main Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            backgroundColor: theme.palette.grey[50],
            minHeight: '100%'
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="info" replace />} />
            <Route path="info" element={<MyInfo />} />
            <Route path="period-start" element={<PeriodStart />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="daily-logs" element={<DailyLogs />} />
            <Route path="attendance" element={<AttendanceView />} />
            <Route path="end-period" element={<EndPeriod />} />
          </Routes>
        </Box>
      </Box>
    </DashboardLayout>
  );
}