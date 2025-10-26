import React from "react";
import { Box, Typography, Chip } from "@mui/material";

export default function PlantillaCreativa({ formData = {} }) {
  const {
    nombre = "Nombre Completo",
    rol = formData.puesto || "Puesto / Profesión",
    email = "correo@ejemplo.com",
    telefono = "+502 1234 5678",
    redes = [],
    acercaDe = formData.perfil || formData.acercaDe || "Descripción breve sobre ti: competencias, años de experiencia, foco profesional.",
    experiencia = [],
    educacion = [],
    habilidades = [],
    portafolio = "",
  } = formData;

  // Limpieza de habilidades y redes
  const cleanHabilidades = Array.isArray(habilidades)
    ? habilidades.map(h => (typeof h === "string" ? h : h.nombre || "")).filter(Boolean)
    : [];

  const cleanRedes = Array.isArray(redes)
    ? redes.map(r => (typeof r === "string" ? r : r.url || "")).filter(Boolean)
    : [];

  const cleanExperiencia = Array.isArray(experiencia)
    ? experiencia.map(exp => ({
        titulo: exp.titulo || exp.puesto || "Cargo no especificado",
        periodo: exp.periodo || "",
        descripcion: exp.descripcion || "",
      }))
    : [];

  const cleanEducacion = Array.isArray(educacion)
    ? educacion.map(edu => ({
        titulo: edu.titulo || edu.nombre || "Título no especificado",
        detalles: edu.detalles || "",
      }))
    : [];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
        gap: 3,
        maxWidth: 820,
        margin: "auto",
        p: 2,
        fontFamily: "'Nunito', sans-serif",
        background: "#FFFDF7",
      }}
    >
      {/* Lateral */}
      <Box
        sx={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.8))",
          borderRadius: 2,
          p: 2,
          boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
        }}
      >
        <Box
          sx={{
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
            mb: 1.5,
          }}
        >
          Tu foto
        </Box>

        <Typography variant="h6" sx={{ fontWeight: "700", color: "#374151", mb: 0.5 }}>
          {nombre}
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", mb: 1.5 }}>
          {rol}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>
            Contacto
          </Typography>
          {email && <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>✉️ {email}</Typography>}
          {telefono && <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>📞 {telefono}</Typography>}
          {cleanRedes.map((r, i) => (
            <Typography key={i} variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
              🔗 {r}
            </Typography>
          ))}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>
            Habilidades
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {cleanHabilidades.map((hab, i) => (
              <Chip
                key={i}
                label={hab}
                sx={{ fontSize: 12, background: "#F3F4F6", color: "#374151" }}
              />
            ))}
          </Box>
        </Box>

        {portafolio && (
          <Box
            sx={{
              mt: 1.5,
              p: 1,
              borderRadius: 1,
              background: "#F9FAFB",
              textAlign: "center",
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            QR → {portafolio}
          </Box>
        )}
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          background: "#fff",
          borderRadius: 2,
          p: 2,
          boxShadow: "0 8px 22px rgba(15,23,42,0.04)",
        }}
      >
        {/* Sobre mí */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>
            Sobre mí
          </Typography>
          <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.45 }}>
            {acercaDe}
          </Typography>
        </Box>

        {/* Experiencia */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>
            Experiencia
          </Typography>
          {cleanExperiencia.length > 0 ? (
            cleanExperiencia.map((exp, i) => (
              <Box key={i} sx={{ mb: 1, pb: 1, borderBottom: "1px dashed #F3F4F6" }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#374151" }}>{exp.titulo}</Typography>
                {exp.periodo && <Typography variant="caption" sx={{ color: "#6B7280" }}>{exp.periodo}</Typography>}
                {exp.descripcion && <Typography variant="body2" sx={{ mt: 0.5, color: "#374151", lineHeight: 1.4 }}>{exp.descripcion}</Typography>}
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "#9CA3AF" }}>No se ha ingresado experiencia.</Typography>
          )}
        </Box>

        {/* Educación */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>
            Educación & Cursos
          </Typography>
          {cleanEducacion.length > 0 ? (
            cleanEducacion.map((edu, i) => (
              <Box key={i} sx={{ mb: 0.5 }}>
                <Typography variant="body2" sx={{ color: "#374151" }}>{edu.titulo}</Typography>
                {edu.detalles && <Typography variant="caption" sx={{ color: "#6B7280" }}>{edu.detalles}</Typography>}
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "#9CA3AF" }}>No se ha ingresado educación.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
