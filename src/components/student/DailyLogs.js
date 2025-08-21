import { useEffect, useState } from "react";
import { fetchLogs, addLog } from "../../services/studentService";
import { Card, CardContent, Typography, Button, TextField, MenuItem, CircularProgress, IconButton } from "@mui/material";
import { Save, Delete } from "@mui/icons-material";

export default function DailyLogs() {
  const [assigns] = useState([
    { _id: "staj1", periodName: "1. Staj" },
    { _id: "staj2", periodName: "2. Staj" }
  ]);

  const [selAssign, setSelAssign] = useState("staj1");
  const [logs, setLogs] = useState([]);
  const [entry, setEntry] = useState({ date: "", desc: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selAssign) fetchLogs(selAssign).then((r) => setLogs(r));
  }, [selAssign]);

  const save = async () => {
    if (!entry.date || !entry.desc) return alert("Lütfen tüm alanları doldurun!");
    setLoading(true);
    await addLog(selAssign, entry);
    fetchLogs(selAssign).then((r) => {
      setLogs(r);
      setEntry({ date: "", desc: "" });
      setLoading(false);
    });
  };

  const deleteLog = (id) => {
    // Burada deleteLog servisini çağırabilirsin
    setLogs(logs.filter((l) => l._id !== id));
  };

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          📘 Eğitim Günlüğü
        </Typography>

        {/* Staj seçimi */}
        <TextField
          select
          label="Staj Dönemi"
          value={selAssign}
          onChange={(e) => setSelAssign(e.target.value)}
          fullWidth
          margin="normal"
        >
          {assigns.map((a) => (
            <MenuItem key={a._id} value={a._id}>
              {a.periodName}
            </MenuItem>
          ))}
        </TextField>

        {/* Yeni giriş */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <TextField
            type="date"
            label="Tarih"
            value={entry.date}
            onChange={(e) => setEntry({ ...entry, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Açıklama"
            value={entry.desc}
            onChange={(e) => setEntry({ ...entry, desc: e.target.value })}
            multiline
          />
        </div>

        <Button
          onClick={save}
          variant="contained"
          color="primary"
          startIcon={<Save />}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Ekle / Güncelle"}
        </Button>

        {/* Log listesi */}
        <div className="mt-6 space-y-3">
          {logs.length === 0 && <Typography color="textSecondary">Henüz kayıt yok.</Typography>}
          {logs.map((l) => (
            <Card key={l._id} className="border">
              <CardContent className="flex justify-between items-center">
                <div>
                  <Typography variant="subtitle1">
                    <strong>{l.date}</strong>
                  </Typography>
                  <Typography variant="body2">{l.desc}</Typography>
                </div>
                <IconButton color="error" onClick={() => deleteLog(l._id)}>
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
