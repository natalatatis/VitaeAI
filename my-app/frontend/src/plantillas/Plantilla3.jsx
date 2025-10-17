import React from "react";
import { Box, Typography, Divider, Chip } from "@mui/material";

export default function PlantillaCreativa({ formData }) {
  const { nombre, email, telefono, redes, acercaDe, experiencia, educacion, habilidades, portafolio } = formData;

  return (
    <Box sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
      gap: 3,
      maxWidth: 820,
      margin: "auto",
      p: 2,
      fontFamily: "'Nunito', sans-serif",
      background: "#FFFDF7",
    }}>
      {/* Lateral */}
      <Box sx={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.8))",
        borderRadius: 2,
        p: 2,
        boxShadow: "0 8px 22px rgba(15,23,42,0.06)"
      }}>
        <Box sx={{
          width: "100%",
          height: 160,
          borderRadius: 2,
          background: "linear-gradient(135deg, #F87171, #34D399)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 20,
          mb: 1.5
        }}>
          Tu foto
        </Box>

        <Typography variant="h6" sx={{ fontWeight: "700", color: "#374151", mb: 0.5 }}>{nombre}</Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", mb: 1.5 }}>Diseñadora Gráfica • Brand Designer</Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>Contacto</Typography>
          {email && <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>✉️ {email}</Typography>}
          {telefono && <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>📞 {telefono}</Typography>}
          {redes?.map((r, i) => <Typography key={i} variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>🔗 {r}</Typography>)}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>Habilidades</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {habilidades?.map((hab, i) => (
              <Chip key={i} label={hab} sx={{ fontSize: 12, background: "#F3F4F6", color: "#374151" }} />
            ))}
          </Box>
        </Box>

        {portafolio && (
          <Box sx={{
            mt: 1.5, p: 1, borderRadius: 1, background: "#F9FAFB", textAlign: "center",
            fontSize: 11, color: "#6B7280"
          }}>
            QR → {portafolio}
          </Box>
        )}
      </Box>

      {/* Contenido principal */}
      <Box sx={{
        background: "#fff",
        borderRadius: 2,
        p: 2,
        boxShadow: "0 8px 22px rgba(15,23,42,0.04)"
      }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>Sobre mí</Typography>
          <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.45 }}>{acercaDe}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>Experiencia</Typography>
          {experiencia?.map((exp, i) => (
            <Box key={i} sx={{ mb: 1, pb: 1, borderBottom: "1px dashed #F3F4F6" }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#374151" }}>{exp.titulo}</Typography>
              <Typography variant="caption" sx={{ color: "#6B7280" }}>{exp.periodo}</Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: "#374151", lineHeight: 1.4 }}>{exp.descripcion}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>Educación & Cursos</Typography>
          {educacion?.map((edu, i) => (
            <Box key={i} sx={{ mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: "#374151" }}>{edu.titulo}</Typography>
              <Typography variant="caption" sx={{ color: "#6B7280" }}>{edu.detalles}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
