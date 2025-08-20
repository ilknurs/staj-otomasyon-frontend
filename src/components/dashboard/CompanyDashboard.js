// src/components/dashboard/CompanyDashboard.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Business,
  Work,
  Group,
  Assessment,
  Settings,
  ExitToApp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function CompanyDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Kullanıcı bilgisini localStorage’dan çek
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  // Çıkış butonu
  const handleLogout = () => {
    localStorage.clear(); // token ve user bilgisini sil
    navigate("/login");   // login sayfasına yönlendir
  };

  return (
    <div>
      {/* Üst Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Şirket Paneli
          </Typography>
          <div>
            <Typography variant="body1" sx={{ mr: 2, display: "inline" }}>
              Hoş geldiniz, {user?.name || "Şirket"}
            </Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<ExitToApp />}
              sx={{ backgroundColor: "#d32f2f" }}
              onClick={handleLogout}
            >
              Çıkış Yap
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Kartlar */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        {/* Staj İlanları */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <Work sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" gutterBottom>
                Staj İlanları
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Staj ilanlarınızı yönetin
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#1976d2" }}
              >
                İlan Yönetimi
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Başvurular */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <Business sx={{ fontSize: 40, color: "#2e7d32" }} />
              <Typography variant="h6" gutterBottom>
                Başvurular
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gelen başvuruları inceleyin
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#2e7d32" }}
              >
                Başvuruları Görüntüle
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Stajyer Yönetimi */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <Group sx={{ fontSize: 40, color: "#0288d1" }} />
              <Typography variant="h6" gutterBottom>
                Stajyer Yönetimi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mevcut stajyerlerinizi yönetin
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#0288d1" }}
              >
                Stajyerleri Görüntüle
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Değerlendirmeler */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <Assessment sx={{ fontSize: 40, color: "#ef6c00" }} />
              <Typography variant="h6" gutterBottom>
                Değerlendirmeler
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stajyer değerlendirmelerini yapın
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#ef6c00" }}
              >
                Değerlendirme Yap
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Şirket Profili */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <Settings sx={{ fontSize: 40, color: "#6a1b9a" }} />
              <Typography variant="h6" gutterBottom>
                Şirket Profili
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Şirket bilgilerinizi güncelleyin
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#6a1b9a" }}
              >
                Profili Düzenle
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
