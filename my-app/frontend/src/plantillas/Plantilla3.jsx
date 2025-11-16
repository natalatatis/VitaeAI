import React from "react";
import { Box, Typography, Chip, Button } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function PlantillaCreativa({
  formData = {},
  editMode,
  setFormData,
  onAiHelp,
}) {
  const {
    nombre = "Nombre Completo",
    email = "correo@ejemplo.com",
    telefono = "+502 1234 5678",
    redes = [],
    acercaDe =
      formData.perfil ||
      formData.acercaDe ||
      "Descripción breve sobre ti: competencias, años de experiencia, foco profesional.",
    experiencia = [],
    educacion = [],
    habilidades = [],
    idiomas = [],
    portafolio = "",
  } = formData;

  // 🔹 Limpieza general
  const cleanExperiencia = Array.isArray(experiencia)
    ? experiencia.map((exp) => ({
        sinExperiencia: exp.sinExperiencia || false,
        titulo: exp.titulo || exp.puesto || "Cargo no especificado",
        periodo: exp.periodo || "",
        descripcion: exp.descripcion || "",
      }))
    : [];

  const cleanHabilidades = Array.isArray(habilidades)
    ? habilidades.map((h) => (typeof h === "string" ? h : h.nombre || "")).filter(Boolean)
    : [];

  const cleanIdiomas = Array.isArray(idiomas)
    ? idiomas.map((i) => ({
        idioma: i.idioma || i.nombre || "Idioma",
        nivel: i.nivel || "Nivel",
      }))
    : [];

  const cleanEducacion = Array.isArray(educacion)
    ? educacion.map((edu) => ({
        titulo: edu.titulo || "Título o Curso",
        institucion: edu.institucion || "Institución",
        periodo: edu.periodo || "Periodo",
      }))
    : [];

  // 🔹 Limpieza de texto IA
  const cleanAIText = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*.*?\*\*/g, "")
      .replace(/--+/g, "")
      .replace(/claro.*?aprender[:]?/gi, "")
      .replace(/si necesitas.*$/i, "")
      .trim();
  };

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
      {/* Izquierda */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.8))",
          borderRadius: 2,
          p: 2,
          boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
        }}
      >
        {/* NOMBRE */}
        <Typography
          contentEditable={editMode}
          suppressContentEditableWarning
          onBlur={(e) =>
            setFormData({ ...formData, nombre: e.target.textContent.trim() })
          }
          variant="h6"
          sx={{ fontWeight: 700, color: "#374151", mb: 1 }}
        >
          {nombre}
        </Typography>

        <Typography
          contentEditable={editMode}
          suppressContentEditableWarning
          sx={{ color: "#6B7280", mb: 1 }}
          onBlur={(e) =>
            setFormData({ ...formData, email: e.target.textContent.trim() })
          }
        >
          ✉️ {email}
        </Typography>
        <Typography
          contentEditable={editMode}
          suppressContentEditableWarning
          sx={{ color: "#6B7280", mb: 2 }}
          onBlur={(e) =>
            setFormData({ ...formData, telefono: e.target.textContent.trim() })
          }
        >
          📞 {telefono}
        </Typography>

        {/* HABILIDADES */}
        <Typography variant="subtitle2" sx={{ color: "#F87171", mb: 1 }}>
          Habilidades
        </Typography>
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
              p: "4px 6px",
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.4,
            }}
          >
            {cleanHabilidades.join(", ")}
          </Box>
        ) : (
          cleanHabilidades.map((h, i) => (
            <Chip key={i} label={h} sx={{ m: 0.3 }} />
          ))
        )}

        {/* IDIOMAS */}
        <Typography variant="subtitle2" sx={{ color: "#F87171", mt: 2, mb: 1 }}>
          Idiomas
        </Typography>

        {editMode ? (
          <>
            {cleanIdiomas.length > 0 ? (
              cleanIdiomas.map((i, idx) => (
                <Box
                  key={idx}
                  sx={{
                    mb: 1,
                    p: 1,
                    border: "1px solid #e5e7eb",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    sx={{ fontSize: 13, fontWeight: 600, color: "#374151" }}
                    onBlur={(e) => {
                      const updated = [...cleanIdiomas];
                      updated[idx].idioma = e.target.textContent.trim();
                      setFormData({ ...formData, idiomas: updated });
                    }}
                  >
                    {i.idioma}
                  </Typography>
                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    sx={{ fontSize: 12, color: "#6B7280", ml: 1 }}
                    onBlur={(e) => {
                      const updated = [...cleanIdiomas];
                      updated[idx].nivel = e.target.textContent.trim();
                      setFormData({ ...formData, idiomas: updated });
                    }}
                  >
                    {i.nivel}
                  </Typography>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      borderRadius: "20px",
                      mt: 0.5,
                      fontSize: "0.65rem",
                      py: 0,
                      px: 1.2,
                    }}
                    onClick={() => {
                      const filtered = cleanIdiomas.filter((_, x) => x !== idx);
                      setFormData({ ...formData, idiomas: filtered });
                    }}
                  >
                    Eliminar
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
                fontSize: "0.75rem",
              }}
              onClick={() =>
                setFormData({
                  ...formData,
                  idiomas: [
                    ...cleanIdiomas,
                    { idioma: "Nuevo idioma", nivel: "Nivel" },
                  ],
                })
              }
            >
              ➕ Agregar idioma
            </Button>
          </>
        ) : cleanIdiomas.length > 0 ? (
          cleanIdiomas.map((i, idx) => (
            <Box key={idx} sx={{ mb: 0.5 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
                {i.idioma}
              </Typography>
              <Typography sx={{ ml: 1, fontSize: 12, color: "#6B7280" }}>
                {i.nivel}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ color: "#9CA3AF", fontSize: 12 }}>
            No se han agregado idiomas.
          </Typography>
        )}
      </Box>

      {/* Derecha */}
      <Box sx={{ background: "#fff", borderRadius: 2, p: 2 }}>
        {/* SOBRE MÍ */}
        <Section
          title="Sobre mí"
          showAi={editMode}
          onAiClick={() => onAiHelp?.("perfil", acercaDe)}
        >
          <Typography
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={(e) =>
              setFormData({ ...formData, acercaDe: e.target.textContent })
            }
            variant="body2"
            sx={{ color: "#374151", lineHeight: 1.6, fontSize: 13 }}
          >
            {acercaDe}
          </Typography>
        </Section>

        {/* EXPERIENCIA */}
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

            const newExperiencias = paragraphs.map((text, idx) => ({
              titulo: `Experiencia ${idx + 1}`,
              periodo: "",
              descripcion: text,
            }));

            setFormData({ ...formData, experiencia: newExperiencias });
          }}
        >
          {cleanExperiencia.length === 0 ||
          cleanExperiencia[0]?.sinExperiencia ? (
            <Typography sx={{ color: "#9CA3AF", fontStyle: "italic" }}>
              Sin experiencia laboral.
            </Typography>
          ) : (
            cleanExperiencia.map((exp, i) => (
              <Box
                key={i}
                sx={{
                  mb: 1.8,
                  pb: 1,
                  borderBottom:
                    i !== cleanExperiencia.length - 1
                      ? "1px solid #F3F4F6"
                      : "none",
                }}
              >
                <Typography
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newExp = [...cleanExperiencia];
                    newExp[i].titulo = e.target.textContent.trim();
                    setFormData({ ...formData, experiencia: newExp });
                  }}
                  sx={{
                    fontWeight: 700,
                    color: "#F87171",
                    mb: 0.3,
                    fontSize: 14,
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
                    color: "#374151",
                    fontSize: 13,
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

        {/* EDUCACIÓN */}
        <Section title="Educación & Cursos">
          {editMode ? (
            <>
              {cleanEducacion.length > 0 ? (
                cleanEducacion.map((edu, i) => (
                  <Box
                    key={i}
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
                    <Typography
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const updated = [...cleanEducacion];
                        updated[i].titulo = e.target.textContent.trim();
                        setFormData({ ...formData, educacion: updated });
                      }}
                      sx={{ fontWeight: 600, fontSize: 13, color: "#374151" }}
                    >
                      {edu.titulo}
                    </Typography>

                    <Typography
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const updated = [...cleanEducacion];
                        updated[i].institucion = e.target.textContent.trim();
                        setFormData({ ...formData, educacion: updated });
                      }}
                      sx={{ fontSize: 12, color: "#6B7280" }}
                    >
                      {edu.institucion}
                    </Typography>

                    <Typography
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const updated = [...cleanEducacion];
                        updated[i].periodo = e.target.textContent.trim();
                        setFormData({ ...formData, educacion: updated });
                      }}
                      sx={{ fontSize: 12, color: "#6B7280", ml: 1 }}
                    >
                      {edu.periodo}
                    </Typography>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{
                        alignSelf: "flex-end",
                        borderRadius: 2,
                        mt: 1,
                        fontSize: "0.7rem",
                      }}
                      onClick={() => {
                        const filtered = cleanEducacion.filter((_, x) => x !== i);
                        setFormData({ ...formData, educacion: filtered });
                      }}
                    >
                      Eliminar
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography sx={{ color: "#9CA3AF", fontStyle: "italic", fontSize: 12 }}>
                  No se ha ingresado educación.
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
                  fontSize: "0.75rem",
                }}
                onClick={() =>
                  setFormData({
                    ...formData,
                    educacion: [
                      ...cleanEducacion,
                      {
                        titulo: "Nuevo título o curso",
                        institucion: "Institución",
                        periodo: "Periodo",
                      },
                    ],
                  })
                }
              >
                ➕ Agregar Educación
              </Button>
            </>
          ) : cleanEducacion.length > 0 ? (
            cleanEducacion.map((edu, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography sx={{ fontWeight: 600, color: "#374151" }}>
                  {edu.titulo}
                </Typography>
                <Typography sx={{ color: "#374151", fontSize: 12 }}>
                  {edu.institucion}
                </Typography>
                <Typography sx={{ ml: 1, color: "#6B7280" }}>
                  {edu.periodo}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography sx={{ color: "#9CA3AF", fontStyle: "italic" }}>
              No se ha ingresado educación.
            </Typography>
          )}
        </Section>
      </Box>
    </Box>
  );
}

/* 🔹 Section reusable component */
function Section({ title, children, showAi = false, onAiClick }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{ color: "#F87171", fontSize: 14, fontWeight: 700, mb: 1 }}
      >
        {title}
      </Typography>
      {showAi && (
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
