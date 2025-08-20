// src/components/supervisor/SupervisorReports.js
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
} from "@mui/material";

function SupervisorReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/supervisor/reports", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReports(data.data);
        } else {
          setError("Raporlar alınırken hata oluştu.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Sunucuya bağlanırken hata oluştu.");
        setLoading(false);
      });
  }, []);

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
        Staj Raporları
      </Typography>

      {reports.length === 0 ? (
        <Alert severity="info">Henüz rapor bulunmamaktadır.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Ad Soyad</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Rapor Başlığı</b></TableCell>
                <TableCell><b>Tarih</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.student?.name} {r.student?.surname}</TableCell>
                  <TableCell>{r.student?.email}</TableCell>
                  <TableCell>{r.title}</TableCell>
                  <TableCell>{r.createdAt?.slice(0,10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default SupervisorReports;
