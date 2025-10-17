// src/App.jsx
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";

import LoginPage from "./screens/Login";
import RegistroPage from "./screens/Registro";
import LandingPage from "./screens/Landing";
import Wizard from "./components/Wizard";
import Profile from "./screens/Profile";
import CVPreview from "./components/CVPreview"; 
import TemplateSelector from "./components/TemplateSelector"; // ruta directa para probar

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/preview" element={<CVPreview />} /> {/* <-- nueva ruta */}
          <Route path="/templates" element={<TemplateSelector formData={{}} />} /> {/* opcional para probar */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
