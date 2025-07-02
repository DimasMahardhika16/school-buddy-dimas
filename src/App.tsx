import { Routes, Route, Navigate } from "react-router";
import { LoginPage } from "./page/login";
import { DashboardPage } from "./page/dashboard";
import { RegistPage } from "./page/Register";
import { LupaPas } from "./page/ForgotPass";
import TidakDitemukan404 from "./page/NotFound";

const isLoggedIn = Boolean(localStorage.getItem("token"));

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route path="/register" element={<RegistPage />} />
      <Route path="/forgotpassword" element={<LupaPas />} />
      <Route path="*" element={<TidakDitemukan404 />} />
    </Routes>
  );
}

export default App;
