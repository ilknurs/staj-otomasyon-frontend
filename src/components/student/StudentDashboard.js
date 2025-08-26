import React, { useState, useEffect } from "react";   
import axios from "axios";                            
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,            
  ListItem,        
  ListItemText,    
} from "@mui/material";
import {
  Person,
  Today,
  Book,
  Favorite,
  CloudUpload,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
const navigate = useNavigate()

const studentId = "1234567890abcdef"; // TODO: giriş yapan öğrenciden al
const [file, setFile] = useState(null);
const [uploading, setUploading] = useState(false);
const [files, setFiles] = useState([]);

useEffect(() => {
  axios
    .get(`/api/files?studentId=${studentId}`)
    .then((res) => setFiles(res.data))
    .catch((err) => console.error("Dosyalar alınamadı:", err));
}, [studentId]);

const handleLogout = () => {
  // localStorage temizle
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Gerekirse AuthContext'teki user state'ini sıfırla
  // setUser(null); (eğer context kullanıyorsan)

  // Login sayfasına yönlendir
  navigate("/login", { replace: true });
};


const handleUpload = async () => {
  if (!file) return alert("Lütfen bir dosya seçin!");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("studentId", studentId);

  try {
    setUploading(true);
    await axios.post("/api/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Dosya başarıyla yüklendi!");
    // Listeyi yenile
    const res = await axios.get(`/api/files?studentId=${studentId}`);
    setFiles(res.data);
  } catch (err) {
    console.error("Yükleme hatası:", err);
    alert("Dosya yüklenirken hata oluştu.");
  } finally {
    setUploading(false);
    setFile(null);
  }
};

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
              onClick={handleLogout} // ✅ logout ekledik
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
                onClick={() => {
                  navigate("/student/info");
                }}
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
                onClick={() => {
                  navigate("/student/logs");
                }}
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
                onClick={() => {
                  navigate("/student/daily-logs");
                }}
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
                onClick={() => {
                  navigate("/student/preferences");
                }}
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

              {/* Dosya seçme */}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginTop: "10px" }}
              />

              {/* Yükle butonu */}
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#c2185b" }}
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Yükleniyor..." : "Belge Yükle"}
              </Button>

              {/* Yüklenen belgeleri listele */}
              <List sx={{ mt: 2, textAlign: "left" }}>
                {files.map((f) => (
                  <ListItem key={f._id} divider>
                    <ListItemText
                      primary={f.fileName}
                      secondary={`Yükleme: ${new Date(
                        f.uploadedAt
                      ).toLocaleString()} | Boyut: ${(
                        f.fileSize / 1024
                      ).toFixed(1)} KB`}
                    />
                    <Button
                      href={f.filePath}
                      target="_blank"
                      variant="outlined"
                      size="small"
                    >
                      Görüntüle
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}