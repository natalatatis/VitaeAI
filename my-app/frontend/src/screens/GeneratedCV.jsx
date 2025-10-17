import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Plantilla1 from "../plantillas/Plantilla1";
import Plantilla2 from "../plantillas/Plantilla2";
import Plantilla3 from "../plantillas/Plantilla3";

export default function GeneratedCV() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTemplateId, formData } = location.state || {};

  if (!selectedTemplateId || !formData) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h6">
          No hay información para mostrar el CV 
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/wizard")}>
          Volver al asistente
        </Button>
      </Box>
    );
  }

  const renderTemplate = () => {
    switch (selectedTemplateId) {
      case 1: return <Plantilla1 formData={formData} />;
      case 2: return <Plantilla2 formData={formData} />;
      case 3: return <Plantilla3 formData={formData} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Tu CV generado
      </Typography>

      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {renderTemplate()}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate("/wizard")}>
          Generar otro CV
        </Button>
        <Button variant="contained" color="primary" onClick={() => window.print()}>
          Descargar PDF
        </Button>
      </Box>
    </Box>
  );
}
