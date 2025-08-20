import React from "react";
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
  Person,
  Today,
  Book,
  Favorite,
  CloudUpload,
} from "@mui/icons-material";

export default function StudentDashboard() {
  return (
    <div>
      {/* Üst Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Öğrenci Paneli
          </Typography>
          <div>
            <Typography variant="body1" sx={{ mr: 2, display: "inline" }}>
              Hoş geldin, İlknur
            </Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<Person />}
              sx={{ backgroundColor: "#d32f2f" }}
            >
              Çıkış Yap
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Kartlar */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        {/* Bilgilerim */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <Person sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" gutterBottom>
                Bilgilerim
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kişisel bilgilerini ve profilini görüntüle
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#1976d2" }}
              >
                Bilgilerimi Gör
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Devam Durumu */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <Today sx={{ fontSize: 40, color: "#2e7d32" }} />
              <Typography variant="h6" gutterBottom>
                Devam Durumu
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Katıldığın staj günlerini takip et
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#2e7d32" }}
              >
                Devamı Görüntüle
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Günlükler */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <Book sx={{ fontSize: 40, color: "#0288d1" }} />
              <Typography variant="h6" gutterBottom>
                Günlüklerim
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Staj defterine günlük kayıtlarını ekle
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#0288d1" }}
              >
                Günlüğü Aç
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Tercihler */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <Favorite sx={{ fontSize: 40, color: "#ef6c00" }} />
              <Typography variant="h6" gutterBottom>
                Tercihlerim
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kişisel tercihlerini ve ayarlarını yap
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#ef6c00" }}
              >
                Ayarları Aç
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Belgelerim */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
            <CardContent>
              <CloudUpload sx={{ fontSize: 40, color: "#c2185b" }} />
              <Typography variant="h6" gutterBottom>
                Belgelerim
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Staj belgelerini yükle veya görüntüle
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#c2185b" }}
              >
                Belgeleri Aç
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
