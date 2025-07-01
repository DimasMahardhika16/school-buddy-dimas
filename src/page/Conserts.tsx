import { Route, Routes } from "react-router";
import ConsertsHome from "./components/ConsertHome";
import ConsertsLists from "./components/ConsertLists";

export default function Conserts() {
  return (
    <div style={{ marginLeft: "100px", marginTop: "50px" }}>
      <h1>🎼 Konser</h1>
      <Routes>
        <Route index element={<ConsertsHome />} />
        <Route path="trending" element={<ConsertsLists />} />
        <Route path=":city" element={<ConsertsLists />} />
      </Routes>
    </div>
  );
}
