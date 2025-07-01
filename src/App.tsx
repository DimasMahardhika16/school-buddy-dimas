import { Routes, Route } from "react-router";
import { LoginPage } from "./page/login";
import { DashboardPage } from "./page/dashboard";
import { RegistPage } from "./page/Register";
import { LupaPas } from "./page/ForgotPass";
import TidakDitemukan404 from "./page/NotFound";
import Conserts from "./page/Conserts";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/register" element={<RegistPage />} />
      <Route path="/forgotpassword" element={<LupaPas />} />
      <Route path="conserts/*" element={<Conserts />} />
      <Route path="*" element={<TidakDitemukan404 />} />
    </Routes>
  );
}

export default App;
