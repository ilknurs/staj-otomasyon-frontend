// src/components/common/DashboardLayout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
 Box,
 AppBar,
 Toolbar,
 Typography,
 Avatar,
 Chip,
 Container,
 Paper,
 IconButton,
 Menu,
 MenuItem,
 ListItemIcon,
 ListItemText,
 Divider
} from '@mui/material';
import {
 AdminPanelSettings as AdminIcon,
 School as SchoolIcon,
 Business as BusinessIcon,
 Person as PersonIcon,
 AccountCircle,
 ExitToApp
} from '@mui/icons-material';

const DashboardLayout = ({ 
 children, 
 title, 
 subtitle, 
 headerActions,
 backgroundGradient 
}) => {
 const { user, logout } = useAuth();
 const navigate = useNavigate();
 const [anchorEl, setAnchorEl] = useState(null);

 // Role-based konfigürasyon
 const getRoleConfig = (role) => {
   const configs = {
     admin: {
       icon: <AdminIcon />,
       label: 'Yönetici',
       color: 'error',
       gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
     },
     student: {
       icon: <SchoolIcon />,
       label: 'Öğrenci',
       color: 'primary',
       gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
     },
     company: {
       icon: <BusinessIcon />,
       label: 'Şirket',
       color: 'success',
       gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
     },
     instructor: {
       icon: <PersonIcon />,
       label: 'Eğitmen',
       color: 'warning',
       gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
     }
   };
   return configs[role] || configs.student;
 };

 const currentRoleConfig = getRoleConfig(user?.role);

 // Menu açma/kapatma
 const handleMenuClick = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleMenuClose = () => {
   setAnchorEl(null);
 };

 // Çıkış işlemi
 const handleLogout = async () => {
   try {
     await logout();
     navigate('/login');
   } catch (error) {
     console.error('Çıkış hatası:', error);
   }
   handleMenuClose();
 };

 // Profil sayfasına git
 const handleProfile = () => {
   navigate('/profile');
   handleMenuClose();
 };

 return (
   <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
     {/* Header */}
     <AppBar 
       position="static" 
       elevation={0}
       sx={{
         background: backgroundGradient || currentRoleConfig.gradient,
         backdropFilter: 'blur(10px)',
       }}
     >
       <Toolbar>
         <Typography 
           variant="h6" 
           component="div" 
           sx={{ 
             flexGrow: 1,
             fontWeight: 600,
             color: 'white'
           }}
         >
           Staj Yönetim Sistemi
         </Typography>

         {/* Kullanıcı bilgileri */}
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
           <Chip
             icon={currentRoleConfig.icon}
             label={currentRoleConfig.label}
             color={currentRoleConfig.color}
             variant="outlined"
             sx={{ 
               color: 'white',
               borderColor: 'rgba(255,255,255,0.3)',
               '& .MuiChip-icon': {
                 color: 'white'
               }
             }}
           />
           
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             <Typography variant="body2" sx={{ color: 'white' }}>
               {user?.firstName} {user?.lastName}
             </Typography>
             
             <IconButton
               onClick={handleMenuClick}
               sx={{ color: 'white' }}
             >
               <Avatar 
                 sx={{ 
                   width: 32, 
                   height: 32,
                   bgcolor: 'rgba(255,255,255,0.2)'
                 }}
               >
                 <AccountCircle />
               </Avatar>
             </IconButton>
           </Box>
         </Box>

         {/* Kullanıcı menüsü */}
         <Menu
           anchorEl={anchorEl}
           open={Boolean(anchorEl)}
           onClose={handleMenuClose}
           PaperProps={{
             elevation: 8,
             sx: {
               mt: 1.5,
               minWidth: 200,
               '& .MuiMenuItem-root': {
                 px: 2,
                 py: 1.5,
               }
             }
           }}
         >
           <MenuItem onClick={handleProfile}>
             <ListItemIcon>
               <AccountCircle fontSize="small" />
             </ListItemIcon>
             <ListItemText>Profil</ListItemText>
           </MenuItem>
           
           <Divider />
           
           <MenuItem onClick={handleLogout}>
             <ListItemIcon>
               <ExitToApp fontSize="small" />
             </ListItemIcon>
             <ListItemText>Çıkış Yap</ListItemText>
           </MenuItem>
         </Menu>
       </Toolbar>
     </AppBar>

     {/* Ana içerik alanı */}
     <Container maxWidth="xl" sx={{ py: 3 }}>
       {/* Sayfa başlığı */}
       {title && (
         <Paper
           elevation={1}
           sx={{
             p: 3,
             mb: 3,
             background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
             backdropFilter: 'blur(10px)',
             border: '1px solid rgba(255,255,255,0.2)',
           }}
         >
           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <Box>
               <Typography 
                 variant="h4" 
                 component="h1"
                 sx={{ 
                   fontWeight: 700,
                   background: currentRoleConfig.gradient,
                   backgroundClip: 'text',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   mb: subtitle ? 1 : 0
                 }}
               >
                 {title}
               </Typography>
               {subtitle && (
                 <Typography 
                   variant="body1" 
                   color="text.secondary"
                   sx={{ opacity: 0.8 }}
                 >
                   {subtitle}
                 </Typography>
               )}
             </Box>
             
             {/* Header aksiyonları */}
             {headerActions && (
               <Box sx={{ display: 'flex', gap: 1 }}>
                 {headerActions}
               </Box>
             )}
           </Box>
         </Paper>
       )}

       {/* Sayfa içeriği */}
       <Box>
         {children}
       </Box>
     </Container>
   </Box>
 );
};

export default DashboardLayout;