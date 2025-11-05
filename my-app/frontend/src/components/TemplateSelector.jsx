import React, { useState } from "react";
import { Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import clasicaImg from "../images/clasica.png";
import minimalImg from "../images/minimal.png";
import creativeImg from "../images/creative.png";

export default function TemplateSelector({ formData }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const templates = [
    { id: 1, nombre: "Clásica", preview: clasicaImg },
    { id: 2, nombre: "Minimal", preview: minimalImg },
    { id: 3, nombre: "Creativa", preview: creativeImg },
  ];

  const handleGenerateCV = async () => {
    if (!selectedTemplate) return;

    setLoading(true);

    try {
      const enhancedData = {
        ...formData,
        plantillaId: selectedTemplate,
      };

      localStorage.setItem("finalCV", JSON.stringify(enhancedData));

      navigate("/preview", { state: { selectedTemplate, formData: enhancedData } });
    } catch (err) {
      console.error("Error generando CV:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
        Selecciona una plantilla para tu CV
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {templates.map((tpl) => (
          <Grid item key={tpl.id} xs={12} sm={6} md={4}>
            <Box
              onClick={() => setSelectedTemplate(tpl.id)}
              sx={{
                border: selectedTemplate === tpl.id ? "3px solid #1976d2" : "2px solid #ccc",
                borderRadius: 3,
                cursor: "pointer",
                overflow: "hidden",
                boxShadow: selectedTemplate === tpl.id ? 4 : 1,
                transition: "0.3s",
                "&:hover": { borderColor: "#1976d2", boxShadow: 3 },
                bgcolor: "#fafafa",
              }}
            >
              <Box sx={{ height: 230, backgroundColor: "#f5f5f5" }}>
                <img
                  src={tpl.preview}
                  alt={tpl.nombre}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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

      {/* Botón de acción */}
      {selectedTemplate && (
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGenerateCV}
            disabled={loading}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} color="inherit" sx={{ mr: 2 }} />
                Generando tu CV...
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
