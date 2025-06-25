import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem
} from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import api from '../../services/api';

const defaultForm = {
  documentNature: 'Asıl',
  documentTypeCode: '22',
  lawNumber: '00000',
  newUnitCode: '01',
  oldUnitCode: '01',
  workplaceNumber: '1024633',
  cityCode: '023',
  subcontractorNumber: '000',
  sskNumber: '',
  sgkNumber: '',
  firstName: '',
  lastName: '',
  premiumDays: '30',
  remoteWork: '0',
  grossSalary: '260005,50',
  bonuses: '',
  entryDay: '',
  entryMonth: '',
  exitDay: '',
  exitMonth: '',
  exitReasonCode: '',
  missingDays: '',
  missingReasonCode: '',
  professionCode: '9901.02',
  onLeave: 'EVET',
  accrualReason: 'A',
  serviceMonth: '04',
  serviceYear: '2025',
  incomeTaxExempt: '1',
  incomeTaxBase: '0',
  disabilityRate: '0',
  calculatedTax: '0',
  minWageExemptTax: '0',
  incomeTaxCut: '0',
  minWageExemptStamp: '0',
  stampTaxCut: '0'
};

const fieldList = [
  { key: 'sgkNumber', label: 'SGK No ( TC kimlik No)' },
  { key: 'firstName', label: 'İsim' },
  { key: 'lastName', label: 'Soyadı (en fazla 18 karakter )' },
  { key: 'documentNature', label: 'Belgenin Mahiyeti(Asıl/Ek/İptal)', options: ['Asıl', 'Ek', 'İptal'] },
  { key: 'documentTypeCode', label: 'Belge Türü kodu(2)(*)' },
  { key: 'lawNumber', label: 'Düzenlemeye Esas Kanun No( 5)' },
  { key: 'newUnitCode', label: 'Yeni ünite kodu( 2)' },
  { key: 'oldUnitCode', label: 'Eski ünite kodu(2)' },
  { key: 'workplaceNumber', label: 'İşyeri sıra numarası(7)' },
  { key: 'cityCode', label: 'İl kodu (3)' },
  { key: 'subcontractorNumber', label: 'Alt işveren numarası (3)' },
  { key: 'sskNumber', label: 'SSK Sicil (13)' },
  { key: 'premiumDays', label: 'Prim Ödeme Günü' },
  { key: 'remoteWork', label: 'Uzaktan Çalışma' },
  { key: 'grossSalary', label: 'Hak edilen Ücret' },
  { key: 'bonuses', label: 'Prim, İkramiye ve bu nitelikteki istihkak' },
  { key: 'entryDay', label: 'İşe Giriş Gün (2)' },
  { key: 'entryMonth', label: 'İşe Giriş Ay (2)' },
  { key: 'exitDay', label: 'İşten Çıkış Gün(2)' },
  { key: 'exitMonth', label: 'İşten Çıkış Ay(2)' },
  { key: 'exitReasonCode', label: 'İşten Çıkış Nedeni Kodu(*)' },
  { key: 'missingDays', label: 'Eksik Gün Sayısı' },
  { key: 'missingReasonCode', label: 'Eksik Gün Nedeni Kodu(*)' },
  { key: 'professionCode', label: 'Meslek Kodu' },
  { key: 'onLeave', label: 'İstirahat sürelerinde çalışmamıştır', options: ['EVET', 'HAYIR'] },
  { key: 'accrualReason', label: 'Tahakkuk Nedeni(*)', options: ['A', 'F', 'G', 'H', 'I'] },
  { key: 'serviceMonth', label: 'Hizmet Dönem Ay(2)' },
  { key: 'serviceYear', label: 'Hizmet Dönem Yıl (4)' },
  { key: 'incomeTaxExempt', label: 'Gelir Vergisinden Muaf mı(*)', options: ['1', '2'] },
  { key: 'incomeTaxBase', label: 'Gelir Vergisi Matrahı' },
  { key: 'disabilityRate', label: 'Gelir Vergisi Engelilik Oranı(2)' },
  { key: 'calculatedTax', label: 'Hesaplanan Gelir Vergisi' },
  { key: 'minWageExemptTax', label: 'Asgari Ücret İstisna GV Tutarı' },
  { key: 'incomeTaxCut', label: 'Gelir Vergisi Kesintisi' },
  { key: 'minWageExemptStamp', label: 'Asgari Ücret İstisna DV Tutarı' },
  { key: 'stampTaxCut', label: 'Damga Vergisi Kesintisi' }
];

const DepartmentDashboard = () => {
  const [form, setForm] = useState(defaultForm);
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      //TODO: Staj verilerini backend'e gönder
      // 1. Öğrenci oluştur (veya varsa atla)
      // const studentRes = await api.post('/api/auth/register', {
      //   name: form.name,
      //   surname: form.surname,
      //   email: form.sgkNumber,
      //   password: form.sgkNumber,
      //   role: "student",
      // });

      // const studentId = studentRes.data.id;
      // 2. Staj oluştur
      // await api.post('/api/internships', {
      // Staj verilerini formdan al
      // });

      setSuccess(true);
      setForm(defaultForm);
    } catch (err) {
      setError('Kayıt sırasında hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const downloadInternshipsExcel = async () => {
    try {
      const response = await api.get('/internships');
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Veri formatı hatalı');

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Stajlar');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'stajlar-2025.xlsx');
    } catch (err) {
      alert('Stajlar indirilemedi!');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Departman Paneli
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
            Çıkış Yap
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button variant="outlined" color="primary" onClick={downloadInternshipsExcel}>
                Stajları Excel Olarak İndir
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom>
              Staj Ekle
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={showExtraFields}
                  onChange={() => setShowExtraFields(!showExtraFields)}
                />
              }
              label="İstisna staj durumu ekle"
              sx={{ mb: 2 }}
            />

            <form onSubmit={handleSubmit}>
              <Grid>
                {fieldList.map((field) => {
                  const isEssential = ['sgkNumber', 'firstName', 'lastName'].includes(field.key);
                  if (!isEssential && !showExtraFields) return null;

                  return (
                    <Grid item xs={12} key={field.key} sx={{ mb: 2 }}>
                      {field.options ? (
                        <TextField
                          select
                          size="small"
                          fullWidth
                          label={field.label}
                          name={field.key}
                          value={form[field.key] || ''}
                          onChange={handleChange}
                        >
                          {field.options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        <TextField
                          size="small"
                          fullWidth
                          label={field.label}
                          name={field.key}
                          value={form[field.key] || ''}
                          onChange={handleChange}
                        />
                      )}
                    </Grid>
                  );
                })}
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? 'Kaydediliyor...' : 'Stajı Kaydet'}
                </Button>
                {success && (
                  <Typography color="success.main" sx={{ mt: 1 }}>
                    Kayıt başarılı!
                  </Typography>
                )}
                {error && (
                  <Typography color="error.main" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DepartmentDashboard;
