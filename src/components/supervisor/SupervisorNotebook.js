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
} from "@mui/material";

function SupervisorNotebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotebooks();
  }, []);

  const fetchNotebooks = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/supervisor/notebooks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotebooks(data.data);
        } else {
          setError("Defterler alınırken bir sorun oluştu.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Sunucuya bağlanırken hata oluştu.");
        setLoading(false);
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
        Staj Defterleri
      </Typography>

      {notebooks.length === 0 ? (
        <Alert severity="info">Henüz yüklenmiş defter bulunmamaktadır.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Ad Soyad</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Defter Linki</b></TableCell>
                <TableCell><b>Yüklenme Tarihi</b></TableCell>
                <TableCell align="center"><b>İşlem</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notebooks.map((n) => (
                <TableRow key={n._id}>
                  <TableCell>{n.student?.name} {n.student?.surname}</TableCell>
                  <TableCell>{n.student?.email}</TableCell>
                  <TableCell>{n.fileName || "Dosya"}</TableCell>
                  <TableCell>{n.uploadDate?.slice(0, 10)}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => window.open(n.fileUrl, "_blank")}
                    >
                      İncele
                    </Button>
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

export default SupervisorNotebooks;
