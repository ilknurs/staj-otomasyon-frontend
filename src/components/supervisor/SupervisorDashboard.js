// src/components/supervisor/SupervisorDashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  Person,
  CheckCircle,
  Book,
  Assignment,
  BarChart,
  Logout,
} from "@mui/icons-material";

const SupervisorDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Menü kartları
  const panels = [
    {
      title: "Öğrenci Takibi",
      desc: "Danışmanlığını yaptığınız öğrencileri görüntüleyin",
      icon: <Person fontSize="large" color="primary" />,
      button: "Öğrencileri Görüntüle",
      color: "primary",
      link: "students",
    },
    {
      title: "Staj Onayları",
      desc: "Öğrenci staj başvurularını onaylayın",
      icon: <CheckCircle fontSize="large" color="success" />,
      button: "Onay Bekleyenler",
      color: "success",
      link: "approvals",
    },
    {
      title: "Staj Defterleri",
      desc: "Öğrenci staj defterlerini inceleyin",
      icon: <Book fontSize="large" color="info" />,
      button: "Defterleri İncele",
      color: "info",
      link: "notebooks",
    },
    {
      title: "Değerlendirmeler",
      desc: "Öğrenci değerlendirmelerini yapın",
      icon: <Assignment fontSize="large" color="warning" />,
      button: "Değerlendirme Yap",
      color: "warning",
      link: "evaluations",
    },
    {
      title: "Raporlar",
      desc: "Staj süreç raporlarını görüntüleyin",
      icon: <BarChart fontSize="large" color="secondary" />,
      button: "Raporları Görüntüle",
      color: "secondary",
      link: "reports",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Üst Bar */}
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Danışman Paneli</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>
              Hoş geldiniz, {user?.name} {user?.surname}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              startIcon={<Logout />}
            >
              Çıkış Yap
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sayfa düzeni: solda menü kartları, sağda alt sayfalar */}
      <Grid container spacing={3} sx={{ px: 3 }}>
        {/* Sol Menü Kartları */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {panels.map((panel, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 3,
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    {panel.icon}
                    <Typography variant="h6" gutterBottom>
                      {panel.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {panel.desc}
                    </Typography>
                    <Button
                      variant="contained"
                      color={panel.color}
                      component={Link}
                      to={panel.link}
                      fullWidth
                    >
                      {panel.button}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Sağ İçerik */}
        <Grid item xs={12} md={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupervisorDashboard;
