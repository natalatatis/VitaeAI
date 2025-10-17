import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import Plantilla1 from "../plantillas/Plantilla1";
import Plantilla2 from "../plantillas/Plantilla2";
import Plantilla3 from "../plantillas/Plantilla3";

export default function CVPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTemplate, formData } = location.state || {};

  if (!selectedTemplate || !formData) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h6">
          No hay información para mostrar el CV
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Button variant="outlined" sx={{ mb: 3 }} onClick={() => navigate("/")}>
        ← Volver al inicio
      </Button>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Tu CV generado
      </Typography>

      <Box
        sx={{
          background: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "80%",
          maxWidth: 800,
        }}
      >
        {TemplateComponent && <TemplateComponent formData={formData} />}
      </Box>
    </Box>
  );
}
