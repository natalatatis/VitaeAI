import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function CVMinimal({ formData = {}, editMode, setFormData, onAiHelp }) {
  const {
    nombre = "Nombre Completo",
    email = "correo@ejemplo.com",
    disponibilidad = "Inmediata",
    perfil = formData.acercaDe || "Breve descripción del perfil profesional destacando habilidades y experiencia relevante.",
    habilidades = [],
    educacion = [],
    experiencia = [],
    idiomas = [],
  } = formData;

  // 🔹 Clean arrays
  const cleanHabilidades = Array.isArray(habilidades)
    ? habilidades.map((h) => (typeof h === "string" ? h : h.nombre || "")).filter(Boolean)
    : [];

  const cleanEducacion = Array.isArray(educacion)
    ? educacion.map((e) => ({
        titulo: e.titulo || "Título",
        institucion: e.institucion || "Institución",
        periodo: e.periodo || "",
      }))
    : [];

  const cleanExperiencia = Array.isArray(experiencia)
    ? experiencia.map((exp) => ({
        sinExperiencia: exp.sinExperiencia || false,
        titulo: exp.titulo || exp.puesto || "Cargo no especificado",
        periodo: exp.periodo || "",
        descripcion: exp.descripcion || "",
      }))
    : [];

  const cleanIdiomas = Array.isArray(idiomas)
    ? idiomas.map((i) => ({
        idioma: i.idioma || i.nombre || "Idioma",
        nivel: i.nivel || "Nivel",
      }))
    : [];

  // 🔹 Helper: Clean AI text
  const cleanAIText = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*.*?\*\*/g, "")
      .replace(/--+/g, "")
      .replace(/claro.*?aprender[:]?/gi, "")
      .replace(/si necesitas.*$/i, "")
      .trim();
  };

  // 🔹 Extract initials
  const iniciales = nombre
    ? nombre
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 3)
    : "?";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f3f4f6",
        padding: 4,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "794px",
          minHeight: "1123px",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          padding: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 🔹 Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            pb: 2,
            borderBottom: "2px solid #10B981",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10B981, #06B6D4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {iniciales}
            </Box>
            <Box>
              <Typography
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) =>
                  setFormData({ ...formData, nombre: e.target.textContent.trim() })
                }
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {nombre}
              </Typography>

              {/* Email */}
              <Typography
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const raw = e.target.textContent.trim();
                  const cleanEmail = raw.replace(/^✉️\s*/g, "").trim();
                  setFormData({ ...formData, email: cleanEmail });
                }}
                sx={{ fontSize: 13, color: "#6B7280" }}
              >
                ✉️ {email}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: 11, color: "#9CA3AF" }}>
              Disponibilidad
            </Typography>
            <Typography
              contentEditable={editMode}
              suppressContentEditableWarning
              onBlur={(e) =>
                setFormData({
                  ...formData,
                  disponibilidad: e.target.textContent.trim(),
                })
              }
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

        {/* 🔹 Body */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 3 }}>
          {/* IZQUIERDA */}
          <Box>
            {/* Perfil */}
            <Section
              title="Perfil"
              showAi={editMode}
              onAiClick={() => onAiHelp?.("perfil", perfil)}
            >
              <Typography
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) =>
                  setFormData({ ...formData, acercaDe: e.target.textContent })
                }
                sx={{ fontSize: 13, color: "#111827", lineHeight: 1.5 }}
              >
                {perfil}
              </Typography>
            </Section>

            {/* Habilidades */}
            <Section title="Habilidades técnicas">
              {editMode ? (
                <Box
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newSkills = e.target.textContent
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    setFormData({ ...formData, habilidades: newSkills });
                  }}
                  sx={{
                    border: "1px dashed #ccc",
                    borderRadius: 2,
                    padding: "4px 6px",
                    minHeight: "24px",
                  }}
                >
                  {cleanHabilidades.join(", ")}
                </Box>
              ) : cleanHabilidades.length > 0 ? (
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
            </Section>

            {/* EDUCACIÓN — editable + CRUD */}
            <Section title="Educación">
              {editMode ? (
                <>
                  {cleanEducacion.length > 0 ? (
                    cleanEducacion.map((edu, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          mb: 1.5,
                          p: 1,
                          border: "1px solid #e5e7eb",
                          borderRadius: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.6,
                        }}
                      >
                        {/* Título */}
                        <Typography
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const updated = [...cleanEducacion];
                            updated[idx].titulo = e.target.textContent.trim();
                            setFormData({ ...formData, educacion: updated });
                          }}
                          sx={{ fontWeight: 600, fontSize: 13, color: "#111827" }}
                        >
                          {edu.titulo}
                        </Typography>

                        {/* Institución */}
                        <Typography
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const updated = [...cleanEducacion];
                            updated[idx].institucion = e.target.textContent.trim();
                            setFormData({ ...formData, educacion: updated });
                          }}
                          sx={{ fontSize: 12, color: "#6B7280" }}
                        >
                          {edu.institucion}
                        </Typography>

                        {/* Periodo */}
                        <Typography
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const updated = [...cleanEducacion];
                            updated[idx].periodo = e.target.textContent.trim();
                            setFormData({ ...formData, educacion: updated });
                          }}
                          sx={{ fontSize: 12, color: "#6B7280", ml: 1 }}
                        >
                          {edu.periodo || "Periodo"}
                        </Typography>

                        {/* Botón eliminar */}
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ alignSelf: "flex-end", mt: 0.5, borderRadius: 2 }}
                          onClick={() => {
                            const filtered = cleanEducacion.filter((_, i) => i !== idx);
                            setFormData({ ...formData, educacion: filtered });
                          }}
                        >
                          Eliminar
                        </Button>
                      </Box>
                    ))
                  ) : (
                    <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                      No se ha ingresado educación.
                    </Typography>
                  )}

                  {/* BOTÓN AGREGAR */}
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{
                      mt: 1,
                      textTransform: "none",
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      const updated = [
                        ...cleanEducacion,
                        {
                          titulo: "Nuevo título",
                          institucion: "Nueva institución",
                          periodo: "Periodo",
                        },
                      ];
                      setFormData({ ...formData, educacion: updated });
                    }}
                  >
                    ➕ Agregar educación
                  </Button>
                </>
              ) : cleanEducacion.length > 0 ? (
                cleanEducacion.map((edu, idx) => (
                  <Box key={idx} sx={{ mb: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: "#111827" }}>
                      {edu.titulo}
                    </Typography>
                    <Typography sx={{ color: "#374151", fontSize: 12 }}>
                      {edu.institucion}
                    </Typography>
                    <Typography sx={{ color: "#6B7280", ml: 1 }}>
                      {edu.periodo}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                  No se ha ingresado educación.
                </Typography>
              )}
            </Section>

            {/* 🔹 IDIOMAS */}
            <Section title="Idiomas">
              {editMode ? (
                <>
                  {cleanIdiomas.length > 0 ? (
                    cleanIdiomas.map((i, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          mb: 1.5,
                          p: 1,
                          border: "1px solid #d1d5db",
                          borderRadius: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const updated = [...cleanIdiomas];
                              updated[idx].idioma = e.target.textContent.trim();
                              setFormData({ ...formData, idiomas: updated });
                            }}
                            sx={{ fontWeight: 600, color: "#111827", fontSize: 13 }}
                          >
                            {i.idioma}
                          </Typography>

                          <Typography
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const updated = [...cleanIdiomas];
                              updated[idx].nivel = e.target.textContent.trim();
                              setFormData({ ...formData, idiomas: updated });
                            }}
                            sx={{ color: "#6B7280", fontSize: 12, ml: 1 }}
                          >
                            {i.nivel}
                          </Typography>
                        </Box>

                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ borderRadius: "50%", minWidth: "auto", px: 1 }}
                          onClick={() => {
                            const filtered = cleanIdiomas.filter((_, x) => x !== idx);
                            setFormData({ ...formData, idiomas: filtered });
                          }}
                        >
                          ❌
                        </Button>
                      </Box>
                    ))
                  ) : (
                    <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                      No se han agregado idiomas.
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{
                      mt: 1,
                      textTransform: "none",
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      const updated = [
                        ...cleanIdiomas,
                        { idioma: "Nuevo idioma", nivel: "Nivel" },
                      ];
                      setFormData({ ...formData, idiomas: updated });
                    }}
                  >
                    ➕ Agregar idioma
                  </Button>
                </>
              ) : cleanIdiomas.length > 0 ? (
                cleanIdiomas.map((i, idx) => (
                  <Box key={idx} sx={{ mb: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: "#111827" }}>
                      {i.idioma}
                    </Typography>
                    <Typography sx={{ color: "#6B7280", ml: 1 }}>
                      {i.nivel}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                  No se han agregado idiomas.
                </Typography>
              )}
            </Section>
          </Box>

          {/* DERECHA */}
          <Box>
            <Section
              title="Experiencia"
              showAi={editMode}
              onAiClick={async () => {
                const aiResult = await onAiHelp?.("experiencia", cleanExperiencia);
                if (!aiResult) return;

                const cleaned = cleanAIText(aiResult);
                const paragraphs = cleaned
                  .split(/\n{2,}/)
                  .map((p) => p.trim())
                  .filter((p) => p.length > 20);

                const parsedExperiencia = paragraphs.map((text, idx) => ({
                  titulo: `Experiencia ${idx + 1}`,
                  periodo: "",
                  descripcion: text,
                }));

                setFormData({ ...formData, experiencia: parsedExperiencia });
              }}
            >
              {cleanExperiencia.length === 0 ||
              cleanExperiencia[0]?.sinExperiencia ? (
                <Typography
                  sx={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic" }}
                >
                  Sin experiencia laboral.
                </Typography>
              ) : (
                cleanExperiencia.map((exp, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Typography
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newExp = [...cleanExperiencia];
                        newExp[i].titulo = e.target.textContent.trim();
                        setFormData({ ...formData, experiencia: newExp });
                      }}
                      sx={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#10B981",
                        mb: 0.5,
                      }}
                    >
                      {exp.titulo}
                    </Typography>

                    <Typography
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newExp = [...cleanExperiencia];
                        newExp[i].descripcion = e.target.textContent.trim();
                        setFormData({ ...formData, experiencia: newExp });
                      }}
                      sx={{
                        fontSize: 13,
                        color: "#111827",
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {exp.descripcion}
                    </Typography>
                  </Box>
                ))
              )}
            </Section>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* 🔹 Reusable Section Component */
function Section({ title, children, showAi = false, onAiClick }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          color: "#10B981",
          fontSize: 14,
          fontWeight: 700,
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {showAi && onAiClick && (
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<AutoFixHighIcon />}
          onClick={onAiClick}
          sx={{
            textTransform: "none",
            fontSize: "0.8rem",
            mb: 1,
            borderRadius: "10px",
          }}
        >
          Ayuda con IA
        </Button>
      )}
      {children}
    </Box>
  );
}
