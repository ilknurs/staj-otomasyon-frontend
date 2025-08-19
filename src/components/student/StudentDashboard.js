import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Tabs,
  Tab,
  Paper,
  CssBaseline,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import {
  Person,
  BarChart,
  Schedule,
  Assignment,
  Favorite,
  Flag,
  TrendingUp,
  EmojiEvents,
  CalendarToday,
  CloudUpload,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// === Sekme Paneli bileşeni ===
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // ✅ Dosya state'i
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // ✅ Dark Mode state
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // ✅ MUI tema ayarı
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
    },
  });

  // ✅ Dark mode değiştikçe localStorage’a kaydet
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ✅ Öğrencinin dosyalarını çekme (useEffect’in üstüne taşındı!)
  const fetchStudentFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/files/my-files", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        setUploadedFiles(result.files);
      }
    } catch (err) {
      console.error("Dosyalar çekilemedi:", err);
    }
  };

  // === Test datası (API yerine) ===
  useEffect(() => {
    setData({
      student: {
        name: "İlknur",
        surname: "Serçek",
        email: "ilknur@example.com",
        department: "Adli Bilişim",
      },
      studentInfo: {
        tc_no: "12345678901",
        sinif: "3",
        staj_baslangic_tarihi: "2025-06-01",
        staj_bitis_tarihi: "2025-07-31",
      },
      dashboardStats: {
        tamamlanan_gun: 20,
        toplam_gun: 40,
        devam_orani: 75,
        ortalama_puan: 8.7,
      },
      dailyLogs: [
        { date: "2025-07-01", content: "React ile frontend geliştirdim" },
        { date: "2025-07-02", content: "API bağlantılarını tamamladım" },
      ],
      preferences: { company: "ABC Teknoloji", field: "Yapay Zeka" },
    });

    fetchStudentFiles(); // ✅ artık güvenle çağırabiliyoruz
  }, []);

  if (!data) return <Typography>Yükleniyor...</Typography>;

  const { student, studentInfo, dashboardStats, dailyLogs, preferences } = data;

  // ✅ Dosya yükleme işlemi
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setUploadedFiles((prev) => [...prev, ...result.files]);
      } else {
        alert("Dosya yükleme başarısız!");
      }
    } catch (err) {
      console.error("Dosya yükleme hatası:", err);
    }
  };

  // ✅ Dosya silme
  const handleDeleteFile = async (fileId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/files/${fileId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        setUploadedFiles((prev) => prev.filter((f) => f._id !== fileId));
      } else {
        alert("Dosya silinemedi!");
      }
    } catch (err) {
      console.error("Dosya silme hatası:", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* === Üstte Profil Kartı + Dark Mode Switch === */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Card sx={{ flex: 1, p: 2, display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{ bgcolor: "primary.main", width: 72, height: 72, mr: 3 }}
            >
              {student.name[0]}
            </Avatar>
            <Box>
              <Typography variant="h5">
                {student.name} {student.surname}
              </Typography>
              <Typography color="text.secondary">{student.email}</Typography>
              <Typography color="text.secondary">
                {student.department} Bölümü
              </Typography>
              <Chip
                label={`Sınıf: ${studentInfo.sinif}`}
                color="secondary"
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Card>

          {/* ✅ Dark Mode Switch */}
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="default"
              />
            }
            label={darkMode ? "Dark Mode" : "Light Mode"}
            sx={{ ml: 2 }}
          />
        </Box>

        {/* === Sekmeler === */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<BarChart />} iconPosition="start" label="Özet" />
            <Tab icon={<Person />} iconPosition="start" label="Bilgilerim" />
            <Tab icon={<Schedule />} iconPosition="start" label="Devam" />
            <Tab icon={<Assignment />} iconPosition="start" label="Günlükler" />
            <Tab icon={<Favorite />} iconPosition="start" label="Tercihler" />
            <Tab
              icon={<CloudUpload />}
              iconPosition="start"
              label="Belgelerim"
            />
          </Tabs>
        </Paper>

        {/* === Belgelerim === */}
        <TabPanel value={activeTab} index={5}>
          <Card>
            <CardContent>
              <Typography variant="h6">Belgelerim</Typography>
              <Divider sx={{ my: 2 }} />

              {/* Dosya Yükleme */}
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  Dosya Yükle
                  <input
                    hidden
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    onChange={handleFileUpload}
                  />
                </Button>
              </Box>

              {/* Dosya Listesi */}
              {uploadedFiles.length > 0 ? (
                <List>
                  {uploadedFiles.map((file, idx) => (
                    <ListItem
                      key={idx}
                      divider
                      secondaryAction={
                        <Button
                          color="error"
                          variant="outlined"
                          size="small"
                          onClick={() => handleDeleteFile(file._id)}
                        >
                          Sil
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={
                          <a
                            href={`http://localhost:5000/uploads/${file.fileName}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "#1976d2" }}
                          >
                            {file.fileName || file.name}
                          </a>
                        }
                        secondary={`Boyut: ${
                          file.fileSize
                            ? (file.fileSize / 1024).toFixed(2) + " KB"
                            : ""
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">
                  Henüz dosya yüklenmedi.
                </Typography>
              )}
            </CardContent>
          </Card>
        </TabPanel>
      </Container>
    </ThemeProvider>
  );
}
