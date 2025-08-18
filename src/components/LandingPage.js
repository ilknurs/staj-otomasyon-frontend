import React from "react";
import { Box, Card, CardContent, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

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
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          boxShadow: 6,
          borderRadius: 3,
          textAlign: "center",
          p: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Staj Otomasyon Sistemine Hoşgeldiniz
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Devam etmek için seçim yapın
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              startIcon={<LoginIcon />}
              sx={actionButtonSx}
            >
              Giriş Yap
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="contained"     // aynı stil
              color="primary"
              size="large"
              fullWidth
              startIcon={<PersonAddAlt1Icon />}
              sx={actionButtonSx}
            >
              Kayıt Ol
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
