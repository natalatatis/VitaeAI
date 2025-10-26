import React from "react";
import { Box, Typography } from "@mui/material";

export default function CVMinimal({ formData = {} }) {
  const {
    nombre = "Nombre Completo",
    rol = formData.puesto || "Puesto / Profesión", // compatibilidad con Plantilla1
    ubicacion = formData.ciudad || "Ciudad, País",
    email = "correo@ejemplo.com",
    linkedin = "linkedin.com/in/usuario",
    disponibilidad = "Inmediata",
    perfil = formData.acercaDe || "Breve descripción del perfil profesional destacando habilidades y experiencia relevante.",
    habilidades = [],
    educacion = [],
    experiencia = [],
    proyectos = [],
  } = formData;

  // Limpieza de habilidades
  const cleanHabilidades = Array.isArray(habilidades)
    ? habilidades.map(h => (typeof h === "string" ? h : h.nombre || "")).filter(Boolean)
    : [];

  // Limpieza de educación
  const cleanEducacion = Array.isArray(educacion)
    ? educacion.map(e => ({
        titulo: e.titulo || e.nombre || "Título no especificado",
        periodo: e.periodo || e.anio || "",
      }))
    : [];

  // Limpieza de experiencia
  const cleanExperiencia = Array.isArray(experiencia)
    ? experiencia.map(exp => ({
        titulo: exp.titulo || exp.puesto || "Cargo no especificado",
        periodo: exp.periodo || "",
        descripcion: exp.descripcion || "",
      }))
    : [];

  // Limpieza de proyectos
  const cleanProyectos = Array.isArray(proyectos)
    ? proyectos.map(p => ({
        titulo: p.titulo || p.nombre || "Proyecto sin nombre",
        detalles: p.detalles || "",
        descripcion: p.descripcion || "",
      }))
    : [];

  // Iniciales del nombre
  const iniciales = nombre
    ? nombre
        .split(" ")
        .filter(Boolean)
        .map(n => n[0])
        .join("")
        .slice(0, 3)
    : "?";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#F9FAFB",
        padding: 3,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: 820,
          backgroundColor: "#FFFFFF",
          borderRadius: 2,
          padding: 3.5,
          boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              width: 88,
              height: 88,
              borderRadius: 2,
              background: "linear-gradient(135deg, #10B981, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {iniciales}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 22,
                color: "#111827",
              }}
            >
              {nombre}
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#6B7280", marginTop: 0.5 }}>
              {rol}
            </Typography>
            <Box
              sx={{
                marginTop: 1,
                fontSize: 12,
                color: "#6B7280",
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              📍 {ubicacion} • ✉️ {email} • 🔗 {linkedin}
            </Box>
          </Box>

          <Box sx={{ width: 140, textAlign: "right" }}>
            <Typography sx={{ fontSize: 11, color: "#9CA3AF" }}>
              Disponibilidad
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#10B981",
                marginTop: 0.5,
              }}
            >
              {disponibilidad}
            </Typography>
          </Box>
        </Box>

        {/* Grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 2 }}>
          {/* Columna izquierda */}
          <Box>
            {/* Perfil */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                sx={{
                  color: "#10B981",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  marginBottom: 1,
                }}
              >
                Perfil
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#111827", lineHeight: 1.45 }}>
                {perfil}
              </Typography>
            </Box>

        {/* Habilidades */}
            <Box sx={{ marginBottom: 2 }}>
            <Typography
                sx={{
                color: "#10B981",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.6,
                marginBottom: 1,
                }}
            >
                Habilidades técnicas
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {cleanHabilidades.length > 0 ? (
                cleanHabilidades.map((h, i) => (
                    <Typography key={i} sx={{ fontSize: 13, color: "#111827" }}>
                    {h}
                    </Typography>
                ))
                ) : (
                <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                    No se han agregado habilidades.
                </Typography>
                )}
            </Box>
            </Box>

            {/* Educación */}
            <Box>
              <Typography
                sx={{
                  color: "#10B981",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  marginBottom: 1,
                }}
              >
                Educación
              </Typography>
              {cleanEducacion.length > 0 ? (
                cleanEducacion.map((edu, i) => (
                  <Box key={i} sx={{ marginBottom: 1 }}>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: 13, color: "#111827" }}
                    >
                      {edu.titulo}
                    </Typography>
                    {edu.periodo && (
                      <Typography sx={{ fontSize: 12, color: "#6B7280", marginTop: 0.5 }}>
                        {edu.periodo}
                      </Typography>
                    )}
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                  No se ha ingresado educación.
                </Typography>
              )}
            </Box>
          </Box>

          {/* Columna derecha */}
          <Box>
            {/* Experiencia */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                sx={{
                  color: "#10B981",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  marginBottom: 1,
                }}
              >
                Experiencia
              </Typography>
              {cleanExperiencia.length > 0 ? (
                cleanExperiencia.map((exp, i) => (
                  <Box key={i} sx={{ marginBottom: 2 }}>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: 13, color: "#111827" }}
                    >
                      {exp.titulo}
                    </Typography>
                    {exp.periodo && (
                      <Typography sx={{ fontSize: 12, color: "#6B7280", marginTop: 0.5 }}>
                        {exp.periodo}
                      </Typography>
                    )}
                    {exp.descripcion && (
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: "#111827",
                          marginTop: 0.5,
                          lineHeight: 1.4,
                        }}
                      >
                        {exp.descripcion}
                      </Typography>
                    )}
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                  No se ha ingresado experiencia.
                </Typography>
              )}
            </Box>

            {/* Proyectos */}
            <Box>
              <Typography
                sx={{
                  color: "#10B981",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  marginBottom: 1,
                }}
              >
                Proyectos
              </Typography>
              {cleanProyectos.length > 0 ? (
                cleanProyectos.map((p, i) => (
                  <Box key={i} sx={{ marginBottom: 2 }}>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: 13, color: "#111827" }}
                    >
                      {p.titulo}
                    </Typography>
                    {p.detalles && (
                      <Typography sx={{ fontSize: 12, color: "#6B7280", marginTop: 0.5 }}>
                        {p.detalles}
                      </Typography>
                    )}
                    {p.descripcion && (
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: "#111827",
                          marginTop: 0.5,
                          lineHeight: 1.4,
                        }}
                      >
                        {p.descripcion}
                      </Typography>
                    )}
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                  No se han agregado proyectos.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
