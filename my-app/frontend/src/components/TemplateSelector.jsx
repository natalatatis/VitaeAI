// src/components/TemplateSelector.jsx
import React, { useState } from "react";
import { Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import clasicaImg from "../images/clasica.png";
import minimalImg from "../images/minimal.png";
import creativeImg from "../images/creative.png";

export default function TemplateSelector({ formData }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ================================
  // 1) SAFELY ensure formData exists
  // ================================
  const previousFormData = {
    ...(location.state?.formData || formData || {}),
  };

  // ================================
  // 2) SAFELY ensure required fields
  // ================================
  previousFormData.nombre = previousFormData.nombre || "Nombre Completo";
  previousFormData.apellido = previousFormData.apellido || "";
  previousFormData.email = previousFormData.email || "correo@ejemplo.com";
  previousFormData.telefono = previousFormData.telefono || "";
  previousFormData.acercaDe =
    previousFormData.acercaDe ||
    previousFormData.perfil ||
    "Breve descripción del perfil profesional";

  const safeArray = (x) => (Array.isArray(x) ? x : []);

  previousFormData.experiencia = safeArray(previousFormData.experiencia);
  previousFormData.educacion = safeArray(previousFormData.educacion);
  previousFormData.habilidades = safeArray(previousFormData.habilidades);
  previousFormData.idiomas = safeArray(previousFormData.idiomas);

  // ================================
  // 3) TEMPLATES
  // ================================
  const templates = [
    { id: 1, nombre: "Clásica", preview: clasicaImg },
    { id: 2, nombre: "Minimal", preview: minimalImg },
    { id: 3, nombre: "Creativa", preview: creativeImg },
  ];

  // ================================
  // 4) GENERATE
  // ================================
  const handleGenerateCV = async () => {
    if (!selectedTemplate) return;

    setLoading(true);

    try {
      const storedUser = localStorage.getItem("usuario");
      const user = storedUser ? JSON.parse(storedUser) : null;

      let cvId = null;

      // ===============================================
      // CASE A — USER NOT LOGGED IN -> Just go to preview
      // ===============================================
      if (!user) {
        navigate("/preview", {
          state: {
            selectedTemplate,
            formData: previousFormData,
            cvId: null,
            locked: true,
          },
        });

        setLoading(false);
        return;
      }

      // ===============================================
      // CASE B — USER LOGGED IN -> Save full CV to DB
      // ===============================================
      const payload = {
        userId: user.id_usuario,
        cvTitulo: previousFormData.titulo || "Mi CV",
        cvPlantilla: selectedTemplate,

        datosPersonales: {
          telefono: previousFormData.telefono || null,
          direccion: previousFormData.direccion || null,
          fecha_nacimiento: previousFormData.fecha_nacimiento || null,
          nacionalidad: previousFormData.nacionalidad || null,
        },

        experienciaLaboral: previousFormData.experiencia,
        educacion: previousFormData.educacion,
        habilidades: previousFormData.habilidades,
        idiomas: previousFormData.idiomas,
      };

      const response = await axios.post(
        "http://localhost:3001/api/generar-cv",
        payload
      );

      cvId = response.data.id_cv || response.data.id || null;

      // =============================
      // Go to preview (editable)
      // =============================
      navigate("/preview", {
        state: {
          selectedTemplate,
          formData: previousFormData,
          cvId,
          locked: false,
        },
      });
    } catch (err) {
      console.error("❌ Error enviando CV:", err);
      alert("Hubo un problema al guardar tu CV.");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // 5) RENDER
  // ================================
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        Selecciona una plantilla para tu CV
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {templates.map((tpl) => (
          <Grid item key={tpl.id} xs={12} sm={6} md={4}>
            <Box
              onClick={() => setSelectedTemplate(tpl.id)}
              sx={{
                border:
                  selectedTemplate === tpl.id
                    ? "3px solid #1976d2"
                    : "2px solid #ccc",
                borderRadius: 3,
                cursor: "pointer",
                overflow: "hidden",
                boxShadow: selectedTemplate === tpl.id ? 4 : 1,
                transition: "0.3s",
                "&:hover": { borderColor: "#1976d2", boxShadow: 3 },
                bgcolor: "#fafafa",
                transform:
                  selectedTemplate === tpl.id ? "scale(1.03)" : "scale(1.0)",
              }}
            >
              <Box sx={{ height: 230 }}>
                <img
                  src={tpl.preview}
                  alt={tpl.nombre}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {tpl.nombre}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {selectedTemplate && (
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGenerateCV}
            disabled={loading}
            sx={{ px: 5, py: 1.5, fontSize: "1rem", borderRadius: 3, boxShadow: 2 }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} color="inherit" sx={{ mr: 2 }} />
                Generando CV...
              </>
            ) : (
              "Generar mi CV"
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
}
