import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function Plantilla1({
  formData,
  editMode,
  setFormData,
  onAiHelp,
}) {
  /* ============================================================
     SAFE NORMALIZATION LAYERS
  ============================================================ */

  const cleanEducacion = Array.isArray(formData.educacion)
    ? formData.educacion.map((e) => ({
        titulo: e.titulo || "Título",
        institucion: e.institucion || "Institución",
        periodo: e.periodo || "",
      }))
    : [];

  const cleanExperiencia = Array.isArray(formData.experiencia)
    ? formData.experiencia.map((e) => ({
        puesto: e.puesto || "Puesto",
        periodo: e.periodo || "",
        descripcion: e.descripcion || "",
        sinExperiencia: e.sinExperiencia || false,
      }))
    : [];

  const cleanHabilidades = Array.isArray(formData.habilidades)
    ? formData.habilidades.map((h) =>
        typeof h === "string" ? h : h?.nombre || ""
      )
    : [];

  const cleanIdiomas = Array.isArray(formData.idiomas)
    ? formData.idiomas.map((i) => ({
        idioma:
          typeof i === "string"
            ? i
            : i.idioma || i.nombre || "Idioma",
        nivel:
          typeof i === "string"
            ? ""
            : i.nivel || "",
      }))
    : [];

  const {
    nombre = "Nombre Completo",
    puesto = "Puesto / Profesión",
    ubicacion = "Ciudad, País",
    telefono = "+502 1234 5678",
    email = "correo@ejemplo.com",
    direccion = "Dirección",
    nacionalidad = "Nacionalidad",
    acercaDe = "Breve descripción del perfil profesional...",
    fontFamily = "Arial",
    fontSize = 14,
  } = formData;

  /* ============================================================
     CLEAN AI TEXT
  ============================================================ */
  const cleanAIText = (text) =>
    text
      ?.replace(/\*\*/g, "")
      .replace(/--+/g, "")
      .replace(/claro.*?mejorar.?/gi, "")
      .replace(/como modelo.*$/gi, "")
      .replace(/si necesitas.*$/i, "")
      .trim() || "";

  /* ============================================================
     EXPERIENCE TEXT FORMAT FOR AI
  ============================================================ */
  const getExperienceText = () => {
    if (!cleanExperiencia.length || cleanExperiencia[0]?.sinExperiencia)
      return "";

    return cleanExperiencia
      .map(
        (e) => `${e.puesto}. ${e.descripcion || "Descripción no disponible"}`
      )
      .join("\n\n");
  };

  /* ============================================================
     EDIT HELPERS
  ============================================================ */
  const updateArray = (key, index, field, value) => {
    const updated = [...formData[key]];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, [key]: updated });
  };

  const editable = (value, key) =>
    editMode ? (
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) =>
          setFormData({ ...formData, [key]: e.target.textContent.trim() })
        }
      >
        {value}
      </span>
    ) : (
      value
    );

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <Box
      sx={{
        width: "100%",
        background: "#fff",
        fontFamily,
        fontSize,
        lineHeight: 1.5,
        p: 2,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          pb: 2,
          borderBottom: "3px solid #b3b3b3",
          display: "flex",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 700 }}>
            {editable(nombre, "nombre")}
          </Typography>

          <Typography sx={{ fontSize: 16, color: "#555" }}>
            {editable(puesto, "puesto")}
          </Typography>

          <Typography sx={{ fontSize: 15, color: "#777" }}>
            {editable(ubicacion, "ubicacion")}
          </Typography>
        </Box>
      </Box>

      {/* CONTACT INFO */}
      <Box sx={{ mt: 2, mb: 3, fontSize: 13, color: "#444" }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          📞 {editable(telefono, "telefono")}
          ✉️ {editable(email, "email")}
        </Box>

        <Box sx={{ mt: 1 }}>📍 {editable(direccion, "direccion")}</Box>
        <Box sx={{ mt: 1 }}>🌎 {editable(nacionalidad, "nacionalidad")}</Box>
      </Box>

      {/* GRID */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {/* LEFT COLUMN */}
        <Box>
          {/* PERFIL PROFESIONAL */}
          <Section
            title="Perfil profesional"
            editMode={editMode}
            onAiClick={async () => {
              const result = await onAiHelp?.("perfil", acercaDe);
              if (!result) return;
              setFormData((p) => ({
                ...p,
                acercaDe: cleanAIText(result),
              }));
            }}
          >
            <Typography
              contentEditable={editMode}
              suppressContentEditableWarning
              onBlur={(e) =>
                setFormData({
                  ...formData,
                  acercaDe: e.target.textContent.trim(),
                })
              }
            >
              {acercaDe}
            </Typography>
          </Section>

          {/* EDUCACIÓN */}
          <Section title="Educación" editMode={editMode}>
            {cleanEducacion.map((edu, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateArray("educacion", i, "titulo", e.target.textContent)
                  }
                  sx={{ fontWeight: 600 }}
                >
                  {edu.titulo}
                </Typography>

                <Typography
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateArray(
                      "educacion",
                      i,
                      "institucion",
                      e.target.textContent
                    )
                  }
                >
                  {edu.institucion}
                </Typography>

                <Typography
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  sx={{ fontSize: 13, color: "#666" }}
                  onBlur={(e) =>
                    updateArray("educacion", i, "periodo", e.target.textContent)
                  }
                >
                  {edu.periodo}
                </Typography>

                {editMode && (
                  <Button
                    size="small"
                    sx={{ color: "red", mt: 0.5 }}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        educacion: cleanEducacion.filter((_, x) => x !== i),
                      })
                    }
                  >
                    Eliminar
                  </Button>
                )}
              </Box>
            ))}

            {editMode && (
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() =>
                  setFormData({
                    ...formData,
                    educacion: [
                      ...cleanEducacion,
                      {
                        titulo: "Nuevo título",
                        institucion: "Nueva institución",
                        periodo: "Periodo",
                      },
                    ],
                  })
                }
              >
                ➕ Agregar educación
              </Button>
            )}
          </Section>

          {/* HABILIDADES */}
          <Section title="Habilidades">
            {cleanHabilidades.length ? (
              cleanHabilidades.map((h, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "inline-block",
                    background: "#eee",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "8px",
                    m: 0.5,
                  }}
                >
                  {h}

                  {editMode && (
                    <Button
                      size="small"
                      sx={{ color: "red", ml: 1 }}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          habilidades: cleanHabilidades.filter(
                            (_, x) => x !== i
                          ),
                        })
                      }
                    >
                      x
                    </Button>
                  )}
                </Box>
              ))
            ) : (
              <Typography color="gray">Sin habilidades.</Typography>
            )}

            {editMode && (
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() =>
                  setFormData({
                    ...formData,
                    habilidades: [...cleanHabilidades, "Nueva habilidad"],
                  })
                }
              >
                ➕ Agregar habilidad
              </Button>
            )}
          </Section>

          {/* IDIOMAS */}
          <Section title="Idiomas">
            {cleanIdiomas.map((i, idx) => (
              <Box key={idx} sx={{ mb: 1 }}>
                <Typography
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateArray("idiomas", idx, "idioma", e.target.textContent)
                  }
                >
                  {i.idioma}
                </Typography>

                <Typography
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  sx={{ fontSize: 12, color: "#666" }}
                  onBlur={(e) =>
                    updateArray("idiomas", idx, "nivel", e.target.textContent)
                  }
                >
                  {i.nivel}
                </Typography>

                {editMode && (
                  <Button
                    size="small"
                    sx={{ color: "red", mt: 0.5 }}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        idiomas: cleanIdiomas.filter((_, x) => x !== idx),
                      })
                    }
                  >
                    Eliminar
                  </Button>
                )}
              </Box>
            ))}

            {editMode && (
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
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
            )}
          </Section>
        </Box>

        {/* RIGHT COLUMN — EXPERIENCIA */}
        <Box>
          <Section
            title="Experiencia laboral"
            editMode={editMode}
            onAiClick={async () => {
              const text = getExperienceText();
              const suggestion = await onAiHelp?.(
                "experiencia",
                text || { sinExperiencia: true }
              );
              if (!suggestion) return;

              const cleaned = cleanAIText(suggestion);
              const paragraphs = cleaned
                .split(/\n{2,}/)
                .map((p) => p.trim())
                .filter((p) => p.length > 20);

              const parsed = paragraphs.map((p, idx) => ({
                puesto: `Experiencia ${idx + 1}`,
                periodo: "",
                descripcion: p,
              }));

              setFormData((p) => ({ ...p, experiencia: parsed }));
            }}
          >
            {!cleanExperiencia.length || cleanExperiencia[0]?.sinExperiencia ? (
              <Typography color="gray">Sin experiencia laboral.</Typography>
            ) : (
              cleanExperiencia.map((exp, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    sx={{ fontWeight: 600 }}
                    onBlur={(e) =>
                      updateArray("experiencia", i, "puesto", e.target.textContent)
                    }
                  >
                    {exp.puesto}
                  </Typography>

                  <Typography
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    sx={{ fontSize: 13, color: "#666" }}
                    onBlur={(e) =>
                      updateArray("experiencia", i, "periodo", e.target.textContent)
                    }
                  >
                    {exp.periodo}
                  </Typography>

                  <Typography
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateArray(
                        "experiencia",
                        i,
                        "descripcion",
                        e.target.textContent
                      )
                    }
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
  );
}

/* ============================================================
   SECTION COMPONENT
============================================================ */
function Section({ title, children, editMode, onAiClick }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>

      {editMode && onAiClick && (
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          startIcon={<AutoFixHighIcon />}
          onClick={onAiClick}
          sx={{ mb: 1 }}
        >
          AYUDA CON IA
        </Button>
      )}

      {children}
    </Box>
  );
}
