import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Fade,
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

import Plantilla1 from "../plantillas/Plantilla1";
import Plantilla2 from "../plantillas/Plantilla2";
import Plantilla3 from "../plantillas/Plantilla3";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CVPreview() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    selectedTemplate,
    formData: initialFormData,
    locked,
    cvId,
  } = location.state || {};

  const storedUser = localStorage.getItem("usuario");
  const user =
    storedUser && storedUser !== "null" ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState(
    initialFormData || {
      educacion: [],
      experiencia: [],
      habilidades: [],
      idiomas: [],
    }
  );

  const [saved, setSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [cvName, setCvName] = useState(initialFormData?.title || "Mi CV");

  const cvRef = useRef();

  const templatesMap = {
    1: Plantilla1,
    2: Plantilla2,
    3: Plantilla3,
  };

  const TemplateComponent = templatesMap[selectedTemplate];

  if (!TemplateComponent) {
    navigate("/templates", { replace: true });
    return null;
  }

  // Redirect user to login if needed
  const goLogin = () =>
    navigate("/login", {
      state: {
        from: "/preview",
        previewState: {
          selectedTemplate,
          formData,
          cvId,
          locked: false,
        },
      },
    });

  // ===============================
  // AI HELP
  // ===============================
  const handleAiHelp = async (section, data) => {
    try {
      setLoadingAI(true);

      const response = await fetch("http://localhost:3001/api/ai-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });

      const json = await response.json();
      setLoadingAI(false);

      if (!response.ok) return null;

      return json.suggestion || null;
    } catch (err) {
      setLoadingAI(false);
      console.error("AI Error:", err);
      return null;
    }
  };

  // ===============================
  // DOWNLOAD PDF
  // ===============================
  const handleDownloadPDF = async () => {
    if (!user) return goLogin();

    const element = cvRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${cvName.trim() || "CV"}_VitaeAI.pdf`);
  };

  // ===============================
  // SAVE CV
  // ===============================
  const handleSaveCV = async () => {
    if (!user) return goLogin();

    try {
      const isExisting = formData.id || formData.id_cv || cvId;

      const url = isExisting
        ? `http://localhost:3001/api/cv/${isExisting}`
        : `http://localhost:3001/api/cv`;

      const method = isExisting ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id_usuario,
          title: cvName.trim(),
          template: selectedTemplate,
          data: { ...formData, title: cvName.trim() },
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error("Error saving CV:", err);
      alert("Error al guardar el CV");
    }
  };

  const mustBlur = locked || !user;

  return (
    <Box sx={{ minHeight: "100vh", py: 3, background: "#f3f4f6", position: "relative" }}>
      {/* BACK BUTTONS */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}>
        <Button variant="outlined" onClick={() => navigate("/")}>
          ← Volver al inicio
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            navigate("/templates", { state: { formData, cvId } })
          }
        >
          Cambiar plantilla
        </Button>
      </Box>

      {/* CV NAME INPUT */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Tu CV generado:
        </Typography>

        <TextField
          size="small"
          value={cvName}
          onChange={(e) => setCvName(e.target.value)}
          sx={{ width: 250, background: "#fff", borderRadius: "10px" }}
        />
      </Box>

      {/* CV PREVIEW */}
      <Box sx={{ position: "relative", maxWidth: 900, mx: "auto", mb: 3 }}>
        <Box
          ref={cvRef}
          sx={{
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            width: "100%",
            p: 4,
            filter: mustBlur ? "blur(6px)" : "none",
            opacity: mustBlur ? 0.6 : 1,
            pointerEvents: mustBlur ? "none" : "auto",
            transition: "all 0.3s ease",
          }}
        >
          <TemplateComponent
            formData={formData}
            setFormData={setFormData}
            editMode={editMode && !mustBlur}
            onAiHelp={handleAiHelp}
          />
        </Box>

        {/* BLUR OVERLAY */}
        {mustBlur && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "20px",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Inicia sesión para editar o descargar
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }} onClick={goLogin}>
                Iniciar sesión
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* EDIT TOGGLE + DOWNLOAD / SAVE */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Button
          variant="contained"
          color={editMode ? "warning" : "primary"}
          startIcon={<Edit />}
          onClick={() => setEditMode(!editMode)}
          disabled={mustBlur}
          sx={{ mb: 2 }}
        >
          {editMode ? "Salir de edición" : "Editar contenido"}
        </Button>
      </Box>

      <Fade in>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" disabled={mustBlur} onClick={handleDownloadPDF}>
            Descargar CV
          </Button>
          <Button variant="outlined" disabled={mustBlur} onClick={handleSaveCV}>
            Guardar en mi cuenta
          </Button>
        </Box>
      </Fade>

      {/* SAVED MESSAGE */}
      {saved && (
        <Typography sx={{ textAlign: "center", mt: 2, color: "green" }}>
          ¡CV guardado con éxito!
        </Typography>
      )}

      {/* AI LOADING */}
      {loadingAI && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={70} />
        </Box>
      )}
    </Box>
  );
}
