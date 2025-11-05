// src/App.jsx
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";

// Screens / Pages
import LoginPage from "./screens/Login";
import RegistroPage from "./screens/Registro";
import LandingPage from "./screens/Landing";
import Profile from "./screens/Profile";

// Components
import Wizard from "./components/Wizard";
import CVPreview from "./components/CVPreview";
import TemplateSelector from "./components/TemplateSelector";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Landing / Home */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />

          {/* Profile / User */}
          <Route path="/profile" element={<Profile />} />

          {/* CV Flow */}
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/preview" element={<CVPreview />} />
          <Route path="/templates" element={<TemplateSelector formData={{}} />} />
          
          {/* Optional: Catch-all route */}
          <Route
            path="*"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Página no encontrada</h2>
                <p>La ruta que estás buscando no existe.</p>
              </div>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
