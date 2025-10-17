import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import clasicaImg from "../images/clasica.png";
import minimalImg from "../images/minimal.png";
import creativeImg from "../images/creative.png";

export default function TemplateSelector({ formData }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Make sure the paths are correct relative to this file
  const templates = [
    { id: 1, nombre: "Clásica", preview: clasicaImg },
    { id: 2, nombre: "Minimal", preview: minimalImg },
    { id: 3, nombre: "Creativa", preview: creativeImg },
  ];

  const handleGenerateCV = async () => {
    if (!selectedTemplate) return;

    setLoading(true);

    try {
      const [aboutRes, expRes, eduRes, skillsRes] = await Promise.all([
        fetch("http://localhost:3001/enhance-about", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ acercaDe: formData.acercaDe }),
        }).then(res => res.json()),
        fetch("http://localhost:3001/enhance-exp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ experiencia: formData.experiencia }),
        }).then(res => res.json()),
        fetch("http://localhost:3001/enhance-education", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ educacion: formData.educacion }),
        }).then(res => res.json()),
        fetch("http://localhost:3001/enhance-skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ habilidades: formData.habilidades }),
        }).then(res => res.json()),
      ]);

      const enhancedData = {
        ...formData,
        acercaDe: aboutRes.text || formData.acercaDe,
        experiencia: [{ descripcion: expRes.text || formData.experiencia[0].descripcion }],
        educacion: [{ descripcion: eduRes.text || formData.educacion[0].descripcion }],
        habilidades: [skillsRes.text || formData.habilidades[0]],
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Selecciona una plantilla para tu CV
      </Typography>

      <Grid container spacing={3}>
        {templates.map((tpl) => (
          <Grid item key={tpl.id} xs={12} sm={4}>
            <Box
              onClick={() => setSelectedTemplate(tpl.id)}
              sx={{
                border: selectedTemplate === tpl.id ? "3px solid #1976d2" : "2px solid #ccc",
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": { borderColor: "#1976d2", boxShadow: 2 },
                overflow: "hidden",
                transition: "0.3s",
              }}
            >
              <Box sx={{ height: 220, background: "#f5f5f5" }}>
                <img
                  src={tpl.preview}
                  alt={tpl.nombre}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
            onClick={handleGenerateCV}
            disabled={loading}
          >
            {loading ? "Generando tu CV..." : "Generar mi CV"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
