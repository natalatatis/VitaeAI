import React from "react";
import { Box, Typography } from "@mui/material";

export default function CVMinimal({ formData }) {
  const {
    nombre,
    rol,
    ubicacion,
    email,
    linkedin,
    disponibilidad,
    perfil,
    habilidades,
    educacion,
    experiencia,
    proyectos
  } = formData;

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor: "#F9FAFB",
      padding: 3,
      minHeight: "100vh"
    }}>
      <Box sx={{
        width: 820,
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        padding: 3.5,
        boxShadow: "0 10px 30px rgba(2,6,23,0.06)"
      }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
          <Box sx={{
            width: 88, height: 88, borderRadius: 2,
            background: "linear-gradient(135deg, #10B981, #06B6D4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 18
          }}>
            {nombre?.split(" ").map(n => n[0]).join("")}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontFamily: "Montserrat, sans-serif", fontSize: 22, color: "#111827" }}>{nombre}</Typography>
            <Typography sx={{ fontSize: 13, color: "#6B7280", marginTop: 0.5 }}>{rol}</Typography>
            <Box sx={{ marginTop: 1, fontSize: 12, color: "#6B7280", display: "flex", flexWrap: "wrap", gap: 1 }}>
              📍 {ubicacion} • ✉️ {email} • 🔗 {linkedin}
            </Box>
          </Box>
          <Box sx={{ width: 140, textAlign: "right" }}>
            <Typography sx={{ fontSize: 11, color: "#9CA3AF" }}>Disponibilidad</Typography>
            <Typography sx={{ fontWeight: 700, color: "#10B981", marginTop: 0.5 }}>{disponibilidad}</Typography>
          </Box>
        </Box>

        {/* Grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 2 }}>
          {/* Columna izquierda */}
          <Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography sx={{ color: "#10B981", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, marginBottom: 1 }}>Perfil</Typography>
              <Typography sx={{ fontSize: 13, color: "#111827", lineHeight: 1.45 }}>{perfil}</Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography sx={{ color: "#10B981", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, marginBottom: 1 }}>Habilidades</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {habilidades?.map((h, i) => (
                  <Box key={i} sx={{
                    backgroundColor: "#E6EDEA",
                    color: "#111827",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12
                  }}>{h}</Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography sx={{ color: "#10B981", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, marginBottom: 1 }}>Educación</Typography>
              {educacion?.map((edu, i) => (
                <Box key={i} sx={{ marginBottom: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{edu.titulo}</Typography>
                  <Typography sx={{ fontSize: 12, color: "#6B7280", marginTop: 0.5 }}>{edu.periodo}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Columna derecha */}
          <Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography sx={{ color: "#10B981", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, marginBottom: 1 }}>Experiencia</Typography>
              {experiencia?.map((exp, i) => (
                <Box key={i} sx={{ marginBottom: 2 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{exp.titulo}</Typography>
                  <Typography sx={{ fontSize: 12, color: "#6B7280", marginTop: 0.5 }}>{exp.periodo}</Typography>
                  <Typography sx={{ fontSize: 13, color: "#111827", marginTop: 0.5, lineHeight: 1.4 }}>{exp.descripcion}</Typography>
                </Box>
              ))}
            </Box>

            <Box>
              <Typography sx={{ color: "#10B981", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, marginBottom: 1 }}>Proyectos</Typography>
              {proyectos?.map((p, i) => (
                <Box key={i} sx={{ marginBottom: 2 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{p.titulo}</Typography>
                  <Typography sx={{ fontSize: 12, color: "#6B7280", marginTop: 0.5 }}>{p.detalles}</Typography>
                  <Typography sx={{ fontSize: 13, color: "#111827", marginTop: 0.5, lineHeight: 1.4 }}>{p.descripcion}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
