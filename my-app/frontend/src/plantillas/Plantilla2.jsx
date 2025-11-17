import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function CVMinimal({
  formData = {},
  editMode,
  setFormData,
  onAiHelp,
}) {
  const fileInputRef = useRef(null);

  const {
    nombre = "Nombre Completo",
    email = "correo@ejemplo.com",
    telefono = "00000000",
    direccion = "Dirección",
    nacionalidad = "Nacionalidad",
    disponibilidad = "Inmediata",
    perfil =
      formData.acercaDe ||
      "Breve descripción del perfil profesional destacando habilidades y experiencia relevante.",
    habilidades = [],
    educacion = [],
    experiencia = [],
    idiomas = [],
    profileImage = "",
  } = formData;

  /* ============================================================
     CLICK TO UPLOAD IMAGE
  ============================================================ */
  const handleImageClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  /* ============================================================
     CLEAN ARRAYS
  ============================================================ */
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

  /* ============================================================
     CLEANER AI TEXT
  ============================================================ */
  const cleanAIText = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/--+/g, "")
      .replace(/claro.*?mejorar.?/gi, "")
      .replace(/si necesitas.*$/i, "")
      .replace(/como modelo.*$/gi, "")
      .trim();
  };

  /* ============================================================
     INITIALS (fallback picture)
  ============================================================ */
  const iniciales = nombre
    ? nombre.split(" ").map((n) => n[0]).join("").slice(0, 3)
    : "?";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
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
        {/* ============================================================
           HEADER
        ============================================================ */}
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
          {/* FOTO + NOMBRE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* FOTO */}
            <Box
              onClick={handleImageClick}
              sx={{
                width: 75,
                height: 75,
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #10B981",
                cursor: editMode ? "pointer" : "default",
                backgroundColor: "#E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="perfil"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
                  {iniciales}
                </Typography>
              )}
            </Box>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            {/* NOMBRE + CONTACTO */}
            <Box>
              <Typography
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) =>
                  setFormData({ ...formData, nombre: e.target.textContent.trim() })
                }
                sx={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {nombre}
              </Typography>

              <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
                ✉️{" "}
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setFormData({ ...formData, email: e.target.textContent.trim() })
                  }
                >
                  {email}
                </span>
              </Typography>

              <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
                📞{" "}
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setFormData({ ...formData, telefono: e.target.textContent.trim() })
                  }
                >
                  {telefono}
                </span>
              </Typography>

              <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
                📍{" "}
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setFormData({ ...formData, direccion: e.target.textContent.trim() })
                  }
                >
                  {direccion}
                </span>
              </Typography>

              <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
                🌎{" "}
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setFormData({ ...formData, nacionalidad: e.target.textContent.trim() })
                  }
                >
                  {nacionalidad}
                </span>
              </Typography>
            </Box>
          </Box>

          {/* DISPONIBILIDAD */}
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
              sx={{ fontWeight: 700, color: "#10B981" }}
            >
              {disponibilidad}
            </Typography>
          </Box>
        </Box>

        {/* ================== RESTO DEL CV ================== */}

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 3 }}>
          {/* LEFT COLUMN */}
          <Box>
            {/* PERFIL */}
            <Section
              title="Perfil profesional"
              showAi={editMode}
              onAiClick={async () => {
                const aiResult = await onAiHelp?.("perfil", perfil);
                if (!aiResult) return;

                const cleaned = cleanAIText(aiResult);
                setFormData({ ...formData, acercaDe: cleaned });
              }}
            >
              <Typography
                contentEditable={editMode}
                suppressContentEditableWarning
                sx={{ fontSize: 13, color: "#111827" }}
                onBlur={(e) =>
                  setFormData({ ...formData, acercaDe: e.target.textContent.trim() })
                }
              >
                {perfil}
              </Typography>
            </Section>

            {/* HABILIDADES */}
            <Section title="Habilidades técnicas">
              {cleanHabilidades.length ? (
                cleanHabilidades.map((h, i) => (
                  <Typography key={i} sx={{ fontSize: 13 }}>
                    {h}
                  </Typography>
                ))
              ) : (
                <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                  No se han agregado habilidades.
                </Typography>
              )}
            </Section>

            {/* EDUCACIÓN */}
            <Section title="Educación">
              {cleanEducacion.map((edu, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {edu.titulo}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>
                    {edu.institucion}
                  </Typography>
                  <Typography sx={{ color: "#6B7280" }}>
                    {edu.periodo}
                  </Typography>
                </Box>
              ))}
            </Section>

            {/* IDIOMAS */}
            <Section title="Idiomas">
              {cleanIdiomas.length ? (
                cleanIdiomas.map((i, idx) => (
                  <Typography key={idx}>
                    {i.idioma} — {i.nivel}
                  </Typography>
                ))
              ) : (
                <Typography sx={{ color: "#9CA3AF" }}>
                  No se han agregado idiomas.
                </Typography>
              )}
            </Section>
          </Box>

          {/* RIGHT COLUMN */}
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
                <Typography sx={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic" }}>
                  Sin experiencia laboral.
                </Typography>
              ) : (
                cleanExperiencia.map((exp, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Typography sx={{ fontWeight: 600, color: "#10B981" }}>
                      {exp.titulo}
                    </Typography>
                    <Typography sx={{ fontSize: 13, whiteSpace: "pre-line" }}>
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

/* ============================================================
   SECTION COMPONENT
============================================================ */
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
