import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: ""
  });
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("register"); // register | verify
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Kayıt işlemi
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.email.toLowerCase().endsWith("@firat.edu.tr")) {
      setMessage("Sadece @firat.edu.tr uzantılı mail ile kayıt olabilirsiniz.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage(res.data.message || "Mailinize doğrulama kodu gönderildi.");
      setStep("verify");
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Kayıt sırasında hata oluştu.");
    }
  };

  // Kod doğrulama
  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify", {
        email: form.email,
        code
      });
      setMessage(res.data.message);
      if (res.data.success) {
        setTimeout(() => navigate("/login"), 1500); // 1.5sn sonra login sayfasına yönlendir
      }
    } catch (err) {
      console.error("Verify error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Doğrulama hatası");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        {step === "register" ? "Kayıt Ol" : "Doğrulama"}
      </Typography>

      {step === "register" && (
        <form onSubmit={handleRegister}>
          <TextField fullWidth margin="normal" label="Ad" name="name" onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Soyad" name="surname" onChange={handleChange} />
          <TextField fullWidth margin="normal" label="E-posta" name="email" onChange={handleChange} />
          <TextField fullWidth margin="normal" type="password" label="Şifre" name="password" onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Kayıt Ol
          </Button>
        </form>
      )}

      {step === "verify" && (
        <Box>
          <Typography>{form.email} adresine gelen kodu giriniz:</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Doğrulama Kodu"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleVerify}>
            Doğrula
          </Button>
        </Box>
      )}

      {message && <Typography color="secondary" sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
}
