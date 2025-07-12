import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          fontFamily: "Nunito, sans-serif",
        }}
      >
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);
