import React from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Plantilla1 from "../plantillas/Plantilla1";
import Plantilla2 from "../plantillas/Plantilla2";
import Plantilla3 from "../plantillas/Plantilla3";

export default function CVPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTemplate, formData } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));

  if (!selectedTemplate || !formData) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h6">
          No hay información para mostrar el currículum
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Volver al inicio
        </Button>
      </Box>
    );
  }

  const templatesMap = {
    1: Plantilla1,
    2: Plantilla2,
    3: Plantilla3,
  };
  const TemplateComponent = templatesMap[selectedTemplate];

  // Guardar CV (solo si hay sesión)
  const handleSaveCV = async () => {
    try {
      await axios.post("/api/cv", {
        userId: user.id,
        title: "Mi CV",
        template: selectedTemplate,
        data: formData,
      });
      alert("CV guardado con éxito 🎉");
    } catch (err) {
      console.error(err);
      alert("Error al guardar el CV");
    }
  };

  // Descargar CV (placeholder)
  const handleDownload = () => {
    alert("Descargando CV...");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Button variant="outlined" sx={{ mb: 3 }} onClick={() => navigate("/")}>
        ← Volver al inicio
      </Button>

      {/* ✅ Updated title */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#1a1a1a" }}>
        Vista previa de tu currículum
      </Typography>

      <Box
        sx={{
          background: "#fff",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          width: "80%",
          maxWidth: 800,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {/* Plantilla del CV */}
        {TemplateComponent && <TemplateComponent formData={formData} />}

        {/* 🔒 Overlay si no hay sesión */}
        {!user && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(6px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 3,
              zIndex: 10,
              p: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              🔒 Vista previa
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 360, mb: 2 }}>
              Inicia sesión o crea una cuenta para guardar tus avances y descargar tu currículum.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
                Iniciar sesión
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/register")}>
                Crear cuenta
              </Button>
            </Box>
          </Box>
        )}

        {/* Botones visibles solo si hay sesión */}
        {user && (
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleDownload}>
              Descargar CV
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleSaveCV}>
              Guardar en mi cuenta
            </Button>
          </Box>
        )}
      </Box>

      {/* 🧭 Enlace adicional para no logueados */}
      {!user && (
        <Typography variant="body2" sx={{ mt: 3 }}>
          ¿Ya tienes una cuenta?{" "}
          <Button size="small" onClick={() => navigate("/login")}>
            Inicia sesión
          </Button>{" "}
          o{" "}
          <Button size="small" onClick={() => navigate("/register")}>
            regístrate aquí
          </Button>
        </Typography>
      )}
    </Box>
  );
}
