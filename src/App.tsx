// src/App.tsx
import { Routes, Route } from "react-router";
import { LoginPage } from "./page/login";
import { DashboardPage } from "./page/dashboard";
import { RegistPage } from "./page/Register";
import { LupaPas } from "./page/ForgotPass";
import TidakDitemukan404 from "./page/NotFound";
import { AdminDashboard } from "./admin/AdminDash";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { TestPage } from "./page/TestPage"; // ✅ tambahkan
import { AccountPage } from "./page/AccountPage"; // ✅ tambahkan

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistPage />} />
      <Route path="/forgotpassword" element={<LupaPas />} />

      {/* ✅ User Dashboard - Hanya bisa diakses user */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="user">
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* ✅ Test Page */}
      <Route
        path="/test"
        element={
          <ProtectedRoute role="user">
            <TestPage />
          </ProtectedRoute>
        }
      />

      {/* ✅ Account Page */}
      <Route
        path="/account"
        element={
          <ProtectedRoute role="user">
            <AccountPage />
          </ProtectedRoute>
        }
      />

      {/* ✅ Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<TidakDitemukan404 />} />
    </Routes>
  );
}

export default App;
