// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  role?: "admin" | "user";
}

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export function ProtectedRoute({ children, role }: Props) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decoded = parseJwt(token);
  const userRole = decoded?.isAdmin === true ? "admin" : "user";

  // Optional: validasi token expired
  const now = Math.floor(Date.now() / 1000);
  if (decoded?.exp && decoded.exp < now) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>403 - Akses Ditolak</h1>
        <p>Kamu tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    );
  }

  return <>{children}</>;
}
