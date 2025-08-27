import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import logo from "../assets/firat-logo.png";

export default function LandingPage() {
  const actionButtonSx = {
    fontWeight: 700,
    py: 1.35,
    borderRadius: 2,
    textTransform: "none",
    letterSpacing: 0.2,
    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
    color: "#fff",
    boxShadow: "none",
    transition: "transform .08s ease, box-shadow .2s ease, background .2s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)",
      boxShadow: "0 10px 24px rgba(79,70,229,.35)",
      transform: "translateY(-1px)"
    },
    "&:active": { transform: "translateY(0) scale(.99)" },
    "&:focus-visible": { outline: "2px solid #06B6D4", outlineOffset: 2 }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7B1E3A" // ✅ sabit bordo arka plan
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 3,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#F9EAEA", // ✅ bordoya uygun açık ton
          color: "#4B1C1C",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)"
        }}
      >
        <CardContent>
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={logo}
              alt="Fırat Üniversitesi Logo"
              style={{ width: "80px", height: "80px" }}
            />
          </Box>

          {/* Başlık */}
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#791734ff" }}>
            Fırat Üniversitesi
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "medium", color: "#4B1C1C", mb: 2 }}
          >
            İş Yeri Eğitimi ve Staj Otomasyonu
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Devam etmek için seçim yapın
          </Typography>

          {/* Butonlar */}
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              fullWidth
              startIcon={<LoginIcon />}
              sx={actionButtonSx}
            >
              Giriş Yap
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              fullWidth
              startIcon={<PersonAddAlt1Icon />}
              sx={actionButtonSx}
            >
              Kayıt Ol
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
