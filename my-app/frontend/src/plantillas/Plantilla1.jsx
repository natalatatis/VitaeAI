import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Fade,
  TextField,
  Drawer,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Edit, Close } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import Plantilla1 from "../plantillas/Plantilla1";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CVPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTemplate, formData: initialFormData } = location.state || {};

  const storedUser = localStorage.getItem("usuario");
  const user = storedUser && storedUser !== "null" ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState(
    initialFormData || {
      profileImage: "",
      showImage: true,
      fontFamily: "Arial",
      fontSize: 14,
    }
  );
  const [saved, setSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [cvName, setCvName] = useState(initialFormData?.title || "Mi CV");
  const cvRef = useRef();

  const toggleEdit = () => {
    setEditMode(!editMode);
    setDrawerOpen(!drawerOpen);
  };

  const handleSaveCV = async () => {
    if (!user) return;
    try {
      const isExistingCv = formData.id || formData.id_cv;
      const url = isExistingCv
        ? `http://localhost:3001/api/cv/${isExistingCv}`
        : `http://localhost:3001/api/cv`;
      const method = isExistingCv ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id_usuario,
          title: cvName.trim() || "Mi CV",
          template: selectedTemplate,
          data: { ...formData, title: cvName.trim() || "Mi CV" },
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const errorData = await res.json();
        alert(`Error guardando CV: ${errorData.error}`);
      }
    } catch (err) {
      alert("Error al guardar el CV");
    }
  };

  const handleDownloadPDF = async () => {
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

  return (
    <Box sx={{ minHeight: "100vh", background: "#f3f4f6", py: 3 }}>
      {/* NAV */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}>
        <Button variant="outlined" onClick={() => navigate("/")}>
          ← Volver al inicio
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/templates", { state: { formData } })}
        >
          Cambiar plantilla
        </Button>
      </Box>

      {/* CV NAME */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Tu CV generado:
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          value={cvName}
          onChange={(e) => setCvName(e.target.value)}
          sx={{ width: "250px", background: "#fff", borderRadius: "10px" }}
        />
      </Box>

      {/* CV DISPLAY */}
      <Box
        sx={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          width: "90%",
          maxWidth: 850,
          p: 4,
          mb: 3,
          fontFamily: formData.fontFamily,
          fontSize: `${formData.fontSize}px`,
        }}
        ref={cvRef}
      >
        {/* Plantilla 1 con imagen opcional */}
        <Plantilla1 formData={formData} editMode={editMode} setFormData={setFormData} />
      </Box>

      {/* EDIT BUTTON */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          variant="contained"
          color={editMode ? "success" : "primary"}
          startIcon={<Edit />}
          onClick={toggleEdit}
        >
          {editMode ? "Guardar Cambios" : "Editar CV"}
        </Button>
      </Box>

      {/* EDIT DRAWER */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Editar CV</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* Imagen con switch */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="URL Imagen"
              fullWidth
              value={formData.profileImage || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, profileImage: e.target.value }))
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.showImage ?? true}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, showImage: e.target.checked }))
                  }
                />
              }
              label="Mostrar imagen"
            />
            {formData.profileImage && formData.showImage && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={formData.profileImage}
                  alt="profile"
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <Button
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      profileImage: "",
                      showImage: false,
                    }))
                  }
                >
                  Quitar imagen
                </Button>
              </Box>
            )}
          </Box>

          {/* Font Family */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Fuente</InputLabel>
            <Select
              value={formData.fontFamily || "Arial"}
              label="Fuente"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fontFamily: e.target.value }))
              }
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Georgia">Georgia</MenuItem>
              <MenuItem value="Verdana">Verdana</MenuItem>
              <MenuItem value="Tahoma">Tahoma</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
            </Select>
          </FormControl>

          {/* Font Size */}
          <TextField
            label="Tamaño de letra"
            type="number"
            fullWidth
            value={formData.fontSize || 14}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fontSize: Number(e.target.value) }))
            }
          />
        </Box>
      </Drawer>

      {/* BUTTONS */}
      <Fade in>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" onClick={handleDownloadPDF}>
            Descargar CV
          </Button>
          <Button variant="outlined" onClick={handleSaveCV}>
            Guardar en mi cuenta
          </Button>
        </Box>
      </Fade>

      {/* SAVED MESSAGE */}
      {saved && (
        <Typography sx={{ mt: 2, color: "green" }}>¡CV guardado con éxito!</Typography>
      )}

      {/* AI LOADING */}
      {loadingAI && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255,255,255,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={70} />
            <Typography sx={{ mt: 2 }}>Generando sugerencia con IA...</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
