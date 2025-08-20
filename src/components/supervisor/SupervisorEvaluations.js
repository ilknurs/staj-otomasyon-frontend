// src/components/supervisor/SupervisorEvaluations.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Button,
  TextField,
} from "@mui/material";

function SupervisorEvaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/supervisor/evaluations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvaluations(data.data);
        } else {
          setError("Değerlendirmeler alınırken hata oluştu.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Sunucuya bağlanırken hata oluştu.");
        setLoading(false);
      });
  };

  const handleSubmit = (id, score) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/supervisor/evaluations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchEvaluations();
        } else {
          alert("İşlem başarısız oldu!");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Sunucuya bağlanırken hata oluştu!");
      });
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Öğrenci Değerlendirmeleri
      </Typography>

      {evaluations.length === 0 ? (
        <Alert severity="info">Henüz değerlendirme bulunmamaktadır.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Ad Soyad</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Puan</b></TableCell>
                <TableCell><b>İşlem</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {evaluations.map((e) => (
                <TableRow key={e._id}>
                  <TableCell>{e.student?.name} {e.student?.surname}</TableCell>
                  <TableCell>{e.student?.email}</TableCell>
                  <TableCell>{e.score || "-"}</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      placeholder="Puan"
                      onBlur={(e2) =>
                        handleSubmit(e._id, Number(e2.target.value))
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default SupervisorEvaluations;
