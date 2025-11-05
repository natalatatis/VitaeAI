import React from "react";
import { Box, Typography, Divider, Chip, Grid } from "@mui/material";

export default function Plantilla1({ formData }) {
  const {
    nombre = "Nombre Completo",
    puesto = "Puesto / Profesión",
    ciudad = "Ciudad, País",
    telefono = "+502 1234 5678",
    email = "nombre@correo.com",
    linkedin = "linkedin.com/in/usuario",
    github = "github.com/usuario",
    acercaDe = "Descripción breve (3–4 líneas) con lo más relevante: competencias, años de experiencia y foco profesional.",
    experiencia = [],
    educacion = [],
    habilidades = [],
    idiomas = [],
    proyectos = [],
  } = formData || {};

  // Convertir habilidades a array de strings y filtrar vacíos
  const cleanHabilidades = Array.isArray(habilidades)
    ? habilidades.map(h => (typeof h === "string" ? h : h.nombre || "")).filter(Boolean)
    : [];

  // Limpiar idiomas
  const cleanIdiomas = Array.isArray(idiomas)
    ? idiomas.map(i => ({
        idioma: i.idioma || i.nombre || "",
        nivel: i.nivel || "",
      })).filter(i => i.idioma)
    : [];

  return (
    <Box
      sx={{
        "--accent": "#1E3A8A",
        "--muted": "#6B7280",
        fontFamily: '"Open Sans", Arial, sans-serif',
        background: "#fff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        p: 4,
        borderRadius: 2,
        maxWidth: "800px",
        mx: "auto",
      }}
    >
      {/* Encabezado */}
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #EEF2FF",
          pb: 1.5,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Lora", serif',
              color: "var(--accent)",
              fontWeight: 700,
            }}
          >
            {nombre}
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted)" }}>
            {puesto} {ciudad ? `• ${ciudad}` : ""}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right", fontSize: 13, color: "var(--muted)" }}>
          {telefono && <div>📞 {telefono}</div>}
          {email && <div>✉️ {email}</div>}
          {(linkedin || github) && (
            <div>
              {linkedin && <span>{linkedin}</span>}{" "}
              {github && <>• GitHub: {github}</>}
            </div>
          )}
        </Box>
      </Box>

      {/* Contenido principal */}
      <Grid container spacing={3}>
        {/* Columna izquierda */}
        <Grid item xs={12} md={4}>
          <Section title="Perfil Profesional">
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {acercaDe}
            </Typography>
          </Section>

          <Section title="Educación">
            {educacion.length > 0 ? (
              educacion.map((edu, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: "var(--muted)" }}>
                    {edu.titulo || ""} {edu.institucion ? `— ${edu.institucion}` : ""} {edu.anio ? `(${edu.anio})` : ""}
                  </Typography>
                  {edu.descripcion && (
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}>
                      {edu.descripcion}
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No se ha ingresado educación.
              </Typography>
            )}
          </Section>

          <Section title="Habilidades">
            {cleanHabilidades.length > 0 ? (
                <Typography variant="body2" sx={{ lineHeight: 1.6, wordBreak: "break-word" }}>
                {cleanHabilidades.join(", ")}
                </Typography>
            ) : (
                <Typography variant="body2" color="text.secondary">
                No se han agregado habilidades.
                </Typography>
            )}
            </Section>


          <Section title="Idiomas">
            {cleanIdiomas.length > 0 ? (
              cleanIdiomas.map((idioma, i) => (
                <Typography key={i} variant="body2" sx={{ color: "var(--muted)", wordBreak: "break-word" }}>
                  {idioma.idioma} {idioma.nivel ? `— ${idioma.nivel}` : ""}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No se han agregado idiomas.
              </Typography>
            )}
          </Section>
        </Grid>

        {/* Columna derecha */}
        <Grid item xs={12} md={8}>
          <Section title="Experiencia Laboral">
            {experiencia.length > 0 ? (
              experiencia.map((exp, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: "var(--muted)" }}>
                    {exp.puesto || ""} {exp.empresa ? `— ${exp.empresa}` : ""} {exp.periodo ? `(${exp.periodo})` : ""}
                  </Typography>
                  {exp.descripcion && (
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}>
                      {exp.descripcion}
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No se ha ingresado experiencia.
              </Typography>
            )}
          </Section>

          <Section title="Proyectos Relevantes">
            {proyectos.length > 0 ? (
              proyectos.map((proj, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: "var(--muted)" }}>
                    {proj.nombre || ""}
                  </Typography>
                  {proj.descripcion && (
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}>
                      {proj.descripcion}
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No se han agregado proyectos.
              </Typography>
            )}
          </Section>
        </Grid>
      </Grid>

      {/* Footer */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" sx={{ textAlign: "center", display: "block", color: "var(--muted)" }}>
        Disponible para entrevistas • Referencias disponibles a solicitud
      </Typography>
    </Box>
  );
}

// Componente auxiliar
function Section({ title, children }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ color: "var(--accent)", fontSize: 14, letterSpacing: 0.5, mb: 1, fontWeight: 600 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
