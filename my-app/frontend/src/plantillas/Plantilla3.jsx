import React, { useRef } from "react";
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
    direccion = "Ciudad, País",
    nacionalidad = "Guatemalteca",
    profileImage = "",          
    acercaDe =
      formData.perfil ||
      formData.acercaDe ||
      "Descripción breve sobre ti.",
    experiencia = [],
    educacion = [],
    habilidades = [],
    idiomas = [],
  } = formData;

  /* ============================================================
      PHOTO HANDLER
  ============================================================ */
  const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = () => {
    if (editMode) fileInputRef.current.click();
  };

  /* ============================================================
      SAFE CLEANERS
  ============================================================ */
  const cleanExperiencia = Array.isArray(experiencia)
    ? experiencia.map((exp) => ({
        sinExperiencia: !!exp.sinExperiencia,
        titulo: exp.titulo || exp.puesto || "Cargo no especificado",
        periodo: exp.periodo || "",
        descripcion: exp.descripcion || "",
      }))
    : [];

  const cleanEducacion = Array.isArray(educacion)
    ? educacion.map((edu) => ({
        titulo: edu.titulo || "Título o Curso",
        institucion: edu.institucion || "Institución",
        periodo: edu.periodo || "Periodo",
      }))
    : [];

  const cleanHabilidades = Array.isArray(habilidades)
    ? habilidades.map((h) =>
        typeof h === "string" ? h : h?.nombre || ""
      ).filter(Boolean)
    : [];

  const cleanIdiomas = Array.isArray(idiomas)
    ? idiomas.map((i) => ({
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

  /* ============================================================
      CLEAN AI TEXT
  ============================================================ */
  const cleanAIText = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/--+/g, "")
      .replace(/claro.*?\./gi, "")
      .replace(/como modelo.*$/gi, "")
      .replace(/si necesitas.*$/gi, "")
      .replace(/estoy aquí.*$/gi, "")
      .replace(/por supuesto.*$/gi, "")
      .trim();
  };

  /* ============================================================
      UPDATE HELPERS
  ============================================================ */
  const updateExp = (idx, key, value) => {
    const updated = [...cleanExperiencia];
    updated[idx][key] = value;
    setFormData({ ...formData, experiencia: updated });
  };

  const updateEdu = (idx, key, value) => {
    const updated = [...cleanEducacion];
    updated[idx][key] = value;
    setFormData({ ...formData, educacion: updated });
  };

  const updateIdioma = (idx, key, value) => {
    const updated = [...cleanIdiomas];
    updated[idx][key] = value;
    setFormData({ ...formData, idiomas: updated });
  };

  /* ============================================================
      RENDER
  ============================================================ */
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
      {/* ------------------------------------------------ LEFT ------------------------------------------------ */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.8))",
          borderRadius: 2,
          p: 2,
          boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
        }}
      >
        {/* FOTO */}
        <Box
          onClick={triggerImageUpload}
          sx={{
            width: 120,
            height: 120,
            borderRadius: "12px",
            backgroundColor: "#e5e7eb",
            backgroundImage: profileImage ? `url(${profileImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: editMode ? "pointer" : "default",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#6b7280",
            border: profileImage ? "none" : "2px dashed #cbd5e1",
          }}
        >
          {!profileImage && editMode && "Agregar foto"}
        </Box>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {/* Nombre */}
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

        {/* Email */}
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

        {/* Teléfono */}
        <Typography
          contentEditable={editMode}
          suppressContentEditableWarning
          sx={{ color: "#6B7280", mb: 1 }}
          onBlur={(e) =>
            setFormData({ ...formData, telefono: e.target.textContent.trim() })
          }
        >
          📞 {telefono}
        </Typography>

        {/* Dirección */}
        <Typography
          contentEditable={editMode}
          suppressContentEditableWarning
          sx={{ color: "#6B7280", mb: 1 }}
          onBlur={(e) =>
            setFormData({ ...formData, direccion: e.target.textContent.trim() })
          }
        >
          📍 {direccion}
        </Typography>

        {/* Nacionalidad */}
        <Typography
          contentEditable={editMode}
          suppressContentEditableWarning
          sx={{ color: "#6B7280", mb: 2 }}
          onBlur={(e) =>
            setFormData({ ...formData, nacionalidad: e.target.textContent.trim() })
          }
        >
          🌎 {nacionalidad}
        </Typography>

        {/* -------------------------------- HABILIDADES -------------------------------- */}
        <Section title="Habilidades" color="#F87171">
          {editMode ? (
            <>
              {cleanHabilidades.map((h, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const updated = [...cleanHabilidades];
                      updated[i] = e.target.textContent.trim();
                      setFormData({ ...formData, habilidades: updated });
                    }}
                    sx={{ fontSize: 13, flexGrow: 1 }}
                  >
                    {h}
                  </Typography>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      const filtered = cleanHabilidades.filter((_, x) => x !== i);
                      setFormData({ ...formData, habilidades: filtered });
                    }}
                  >
                    ❌
                  </Button>
                </Box>
              ))}

              <Button
                variant="contained"
                size="small"
                color="secondary"
                sx={{ mt: 1, borderRadius: "20px" }}
                onClick={() =>
                  setFormData({
                    ...formData,
                    habilidades: [...cleanHabilidades, "Nueva habilidad"],
                  })
                }
              >
                ➕ Agregar habilidad
              </Button>
            </>
          ) : (
            cleanHabilidades.map((h, i) => (
              <Chip key={i} label={h} sx={{ m: 0.3 }} />
            ))
          )}
        </Section>

        {/* -------------------------------- IDIOMAS -------------------------------- */}
        <Section title="Idiomas" color="#F87171">
          {editMode ? (
            <>
              {cleanIdiomas.map((idi, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateIdioma(i, "idioma", e.target.textContent.trim())}
                    sx={{ fontWeight: 600 }}
                  >
                    {idi.idioma}
                  </Typography>

                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateIdioma(i, "nivel", e.target.textContent.trim())}
                    sx={{ fontSize: 12, ml: 1 }}
                  >
                    {idi.nivel}
                  </Typography>

                  <Button
                    color="error"
                    size="small"
                    onClick={() => {
                      const filtered = cleanIdiomas.filter((_, x) => x !== i);
                      setFormData({ ...formData, idiomas: filtered });
                    }}
                  >
                    ❌ eliminar
                  </Button>
                </Box>
              ))}

              <Button
                variant="contained"
                size="small"
                color="secondary"
                sx={{ mt: 1, borderRadius: "20px" }}
                onClick={() =>
                  setFormData({
                    ...formData,
                    idiomas: [...cleanIdiomas, { idioma: "Nuevo idioma", nivel: "" }],
                  })
                }
              >
                ➕ Agregar idioma
              </Button>
            </>
          ) : (
            cleanIdiomas.map((i, idx) => (
              <Typography key={idx} sx={{ fontSize: 13, mb: 0.5 }}>
                <strong>{i.idioma}</strong> — {i.nivel}
              </Typography>
            ))
          )}
        </Section>
      </Box>

      {/* ------------------------------------------------ RIGHT ------------------------------------------------ */}
      <Box sx={{ background: "#fff", borderRadius: 2, p: 2 }}>
        {/* SOBRE MI */}
        <Section
          title="Sobre mí"
          showAi={editMode}
          onAiClick={async () => {
            const aiResult = await onAiHelp("perfil", acercaDe);
            if (!aiResult) return;
            const cleaned = cleanAIText(aiResult);
            setFormData({ ...formData, acercaDe: cleaned });
          }}
        >
          <Typography
            contentEditable={editMode}
            suppressContentEditableWarning
            sx={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}
            onBlur={(e) =>
              setFormData({ ...formData, acercaDe: e.target.textContent.trim() })
            }
          >
            {acercaDe}
          </Typography>
        </Section>

        {/* EXPERIENCIA */}
        <Section
          title="Experiencia"
          showAi={editMode}
          onAiClick={async () => {
            const aiResult = await onAiHelp("experiencia", cleanExperiencia);
            if (!aiResult) return;

            const cleaned = cleanAIText(aiResult);

            const paragraphs = cleaned
              .split(/\n{2,}/)
              .map((p) => p.trim())
              .filter((p) => p.length > 20);

            const parsed = paragraphs.map((p, idx) => ({
              titulo: `Experiencia ${idx + 1}`,
              periodo: "",
              descripcion: p,
            }));

            setFormData({ ...formData, experiencia: parsed });
          }}
        >
          {editMode ? (
            <>
              {cleanExperiencia.map((exp, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateExp(i, "titulo", e.target.textContent)}
                    sx={{
                      fontWeight: 700,
                      color: "#F87171",
                      fontSize: 14,
                    }}
                  >
                    {exp.titulo}
                  </Typography>

                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateExp(i, "descripcion", e.target.textContent)}
                    sx={{ fontSize: 13, whiteSpace: "pre-line" }}
                  >
                    {exp.descripcion}
                  </Typography>

                  <Button
                    color="error"
                    size="small"
                    onClick={() => {
                      const filtered = cleanExperiencia.filter((_, x) => x !== i);
                      setFormData({ ...formData, experiencia: filtered });
                    }}
                  >
                    ❌ eliminar
                  </Button>
                </Box>
              ))}

              <Button
                variant="contained"
                size="small"
                color="secondary"
                sx={{ mt: 1, borderRadius: "20px" }}
                onClick={() =>
                  setFormData({
                    ...formData,
                    experiencia: [
                      ...cleanExperiencia,
                      {
                        titulo: "Nuevo puesto",
                        periodo: "",
                        descripcion: "Descripción...",
                      },
                    ],
                  })
                }
              >
                ➕ Agregar experiencia
              </Button>
            </>
          ) : cleanExperiencia.length === 0 ||
            cleanExperiencia[0]?.sinExperiencia ? (
            <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
              Sin experiencia laboral.
            </Typography>
          ) : (
            cleanExperiencia.map((exp, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 700, color: "#F87171" }}>
                  {exp.titulo}
                </Typography>

                <Typography sx={{ fontSize: 13, whiteSpace: "pre-line" }}>
                  {exp.descripcion}
                </Typography>
              </Box>
            ))
          )}
        </Section>

        {/* EDUCACIÓN */}
        <Section title="Educación & Cursos" color="#F87171">
          {editMode ? (
            <>
              {cleanEducacion.map((edu, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateEdu(i, "titulo", e.target.textContent)}
                    sx={{ fontWeight: 600 }}
                  >
                    {edu.titulo}
                  </Typography>

                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateEdu(i, "institucion", e.target.textContent)
                    }
                    sx={{ fontSize: 12 }}
                  >
                    {edu.institucion}
                  </Typography>

                  <Typography
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateEdu(i, "periodo", e.target.textContent)}
                    sx={{ fontSize: 12 }}
                  >
                    {edu.periodo}
                  </Typography>

                  <Button
                    color="error"
                    size="small"
                    onClick={() => {
                      const filtered = cleanEducacion.filter((_, x) => x !== i);
                      setFormData({ ...formData, educacion: filtered });
                    }}
                  >
                    ❌ eliminar
                  </Button>
                </Box>
              ))}

              <Button
                variant="contained"
                size="small"
                color="secondary"
                sx={{ mt: 1, borderRadius: "20px" }}
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
            </>
          ) : (
            cleanEducacion.map((edu, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 600 }}>{edu.titulo}</Typography>
                <Typography sx={{ fontSize: 12 }}>{edu.institucion}</Typography>
                <Typography sx={{ fontSize: 12 }}>{edu.periodo}</Typography>
              </Box>
            ))
          )}
        </Section>
      </Box>
    </Box>
  );
}

/* ============================================================
   SECTION COMPONENT
============================================================ */
function Section({ title, children, showAi = false, onAiClick, color }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          color: color || "#F87171",
          fontSize: 14,
          fontWeight: 700,
          mb: 1,
        }}
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
