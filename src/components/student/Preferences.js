import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Alert,
  Paper,
  Divider,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Save, Favorite } from "@mui/icons-material";
import { fetchPreferences, setPreferences } from "../../services/studentService";


export default function Preferences() {
  // ✅ Statik şirket listesi
  const [companies] = useState([
    { _id: "eam", name: "EAM Teknoloji Protokol" },
    { _id: "adeo", name: "ADEO Teknoloji" },
    { _id: "barikat", name: "Barikat Siber Güvenlik" },
    { _id: "basaran", name: "Başaran Teknoloji" },
    { _id: "bga", name: "BGA Bilgi Güvenliği" },
    { _id: "binalyze", name: "Binalyze Yazılım" },
    { _id: "canesis", name: "Canesis Sistem" },
    { _id: "denizli", name: "Denizli Adalet Komisyonu" },
    { _id: "eker", name: "Eker Süt Ürünleri" },
    { _id: "emt", name: "EMT Elektronik" },
    { _id: "fordefence", name: "Fordefence Bilişim" },
    { _id: "forencrypt", name: "Forencrypt" },
    { _id: "teknoworld", name: "Firma Teknoworld" },
    { _id: "gazi", name: "Gaziantep Üni. Bilgi İşlem Dairesi" },
    { _id: "gais", name: "GAIS Security" },
    { _id: "guvenpark", name: "Güvenpark Bilişim Tek." },
    { _id: "hey", name: "Hey Teknoloji Yazılım" },
    { _id: "invento", name: "Invento Teknoloji" },
    { _id: "iuc", name: "IUC-ISTEC" },
    { _id: "kriptarium", name: "Kriptarium" },
    { _id: "kuzeymus", name: "Kuzey Muş Müşavirlik ve Danışmanlık Yazılım Hizmetleri" },
    { _id: "malatya", name: "Malatya İl Sağlık Müdürlüğü" },
    { _id: "malwation", name: "Malwation Siber Güvenlik" },
    { _id: "may", name: "MAY Siber Teknoloji" },
    { _id: "mersin", name: "Mersin Üni. Bilgi İşlem Dairesi" },
    { _id: "nettsi", name: "Nettsi Bilişim" },
    { _id: "novasistek", name: "Novasistek Müh." },
    { _id: "perito", name: "Perito Arge Yazılım" },
    { _id: "renet", name: "Renet Teknoloji" },
    { _id: "sainovasyon", name: "SA Inovasyon Bilişim" },
    { _id: "safeharbor", name: "Safe Harbor Bilgi Güv." },
    { _id: "sibertime", name: "Sibertime Teknoloji" },
    { _id: "tim", name: "TIM Telekomünikasyon" },
    { _id: "vulnhero", name: "Vulnhero Bilişim" },
    { _id: "zonguldak", name: "Zonguldak İl Özel İdaresi" },
    { _id: "cozumtr", name: "Çözüm TR Ödeme Sistemleri" },
    { _id: "innova", name: "Innova Bilişim" },
  ]);

  
  const [prefs, setPrefs] = useState([null, null, null]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPreferences("123456").then((p) => {
      const filled = [...p, null, null].slice(0, 3);
      setPrefs(filled);
    });
  }, []);

  const handleChange = (index, value) => {
    const updated = [...prefs];
    updated[index] = value;
    setPrefs(updated);
  };

  const save = () => {
    if (!prefs[0]) {
      setMessage({ type: "error", text: "En az 1 tercih seçmelisiniz!" });
      return;
    }
    setPreferences("123456", prefs.filter(Boolean).map((c) => c._id)).then(() =>
      setMessage({ type: "success", text: "Tercihler başarıyla kaydedildi." })
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper
        elevation={6}
        sx={{ p: 5, borderRadius: 3, backgroundColor: "#fafafa" }}
      >
        {/* Başlık */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Favorite color="primary" sx={{ fontSize: 36 }} />
          <Typography variant="h4" fontWeight="bold">
            İşyeri Tercihleri
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Lütfen staj yapmak istediğiniz işyerlerini öncelik sırasına göre seçiniz.  
          <strong>En fazla 3 tercih</strong> yapabilirsiniz.
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {/* Tercih Alanları */}
        <Grid container spacing={4}>
          {[0, 1, 2].map((i) => (
            <Grid item xs={12} key={i}>
              <Autocomplete
                options={companies}
                getOptionLabel={(option) => option?.name || ""}
                value={prefs[i]}
                onChange={(e, val) => handleChange(i, val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`${i + 1}. Tercih`}
                    placeholder="Firma adı arayın..."
                    fullWidth
                  />
                )}
              />
            </Grid>
          ))}
        </Grid>

        {/* Kaydet Butonu */}
        <Box mt={5} textAlign="right">
          <Button
            variant="contained"
            color="success"
            startIcon={<Save />}
            onClick={save}
            sx={{ px: 5, py: 1.5, fontSize: "1rem" }}
          >
            Tercihlerimi Kaydet
          </Button>
        </Box>

        {message && (
          <Alert severity={message.type} sx={{ mt: 3 }}>
            {message.text}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}