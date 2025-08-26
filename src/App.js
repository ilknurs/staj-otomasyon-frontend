// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LandingPage from "./components/LandingPage";

import StudentDashboard from "./components/student/StudentDashboard";
import StudentInfo from "./components/student/StudentInfo";
import DailyLogs from "./components/student/DailyLogs";
import Preferences from "./components/student/Preferences";


import AdminDashboard from "./components/dashboard/AdminDashboard";
import DepartmentDashboard from "./components/dashboard/DepartmentDashboard";
import CompanyDashboard from "./components/dashboard/CompanyDashboard";
import SupervisorDashboard from "./components/supervisor/SupervisorDashboard";

import SupervisorStudents from "./components/supervisor/supervisorStudents";
import SupervisorApprovals from "./components/supervisor/SupervisorApprovals";
import SupervisorNotebooks from "./components/supervisor/SupervisorNotebook";
import SupervisorReports from "./components/supervisor/SupervisorReports";
import SupervisorEvaluations from "./components/supervisor/SupervisorEvaluations";  

import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./utils/axiosConfig";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
  },
});

// Kullanıcıya göre yönlendirme
function DashboardRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case "student":
      return <Navigate to="/student" replace />;
    case "admin":
      return <Navigate to="/admin" replace />;
    case "company":
      return <Navigate to="/company" replace />;
    case "supervisor":
      return <Navigate to="/supervisor" replace />;
    case "department":
      return <Navigate to="/department" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

const students = [
  {path:"/",Component:StudentDashboard},
  {path:"/info",Component:StudentInfo},
  {path:"/logs",Component:DailyLogs},
  {path:"/preferences", Component: Preferences}
]

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Ana sayfa */}
            <Route path="/" element={<LandingPage />} />

            {/* Dashboard yönlendirme */}
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Auth sayfaları */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Korumalı rotalar */}
            
             { 
             students.map(({path,Component}, index) => (
                <Route
                  key={index}
                  path={`/student${path}/*`}
                  element={
                    <ProtectedRoute requiredRole="student">
                      <Component />
                    </ProtectedRoute>
                  }
                />
              ))
            }
          
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/*"
              element={
                <ProtectedRoute requiredRole="company">
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />

            {/* Supervisor nested routes */}
            <Route
              path="/supervisor"
              element={
                <ProtectedRoute requiredRole="supervisor">
                  <SupervisorDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="students" element={<SupervisorStudents />} />
              <Route path="approvals" element={<SupervisorApprovals />} />
              <Route path="notebooks" element={<SupervisorNotebooks />} />
              <Route path="preferences" element={<Preferences />} />

            </Route>

            <Route
              path="/department/*"
              element={
                <ProtectedRoute requiredRole="department">
                  <DepartmentDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 yönlendirmesi */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
