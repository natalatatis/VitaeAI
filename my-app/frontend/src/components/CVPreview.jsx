import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Plantilla1 from "../plantillas/Plantilla1";
import Plantilla2 from "../plantillas/Plantilla2";
import Plantilla3 from "../plantillas/Plantilla3";

export default function CVPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTemplate, formData } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));

  if (!selectedTemplate || !formData) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          bgcolor: "#f9fafb",
          p: 5,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          No hay información para mostrar el currículum
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: "10px" }}
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </Button>
      </Box>
    );
  }

  const templatesMap = {
    1: Plantilla1,
    2: Plantilla2,
    3: Plantilla3,
  };
  const TemplateComponent = templatesMap[selectedTemplate];

  const handleSaveCV = async () => {
    try {
      await axios.post("/api/cv", {
        userId: user.id,
        title: "Mi CV",
        template: selectedTemplate,
        data: formData,
      });
      alert("CV guardado con éxito 🎉");
    } catch (err) {
      console.error(err);
      alert("Error al guardar el CV");
    }
  };

  const handleDownload = () => {
    alert("Descargando CV...");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 5,
      }}
    >
      <Button
        variant="outlined"
        sx={{
          mb: 3,
          borderRadius: "10px",
          borderColor: "#94a3b8",
          color: "#475569",
          "&:hover": {
            borderColor: "#64748b",
            color: "#1e293b",
            background: "#f8fafc",
          },
        }}
        onClick={() => navigate("/")}
      >
        ← Volver al inicio
      </Button>

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "#1e293b",
          textAlign: "center",
        }}
      >
        Vista previa de tu currículum
      </Typography>

      <Box
        sx={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          width: "90%",
          maxWidth: 850,
          p: 4,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {TemplateComponent && <TemplateComponent formData={formData} />}

        {!user && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(6px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
              zIndex: 10,
              textAlign: "center",
              p: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              🔒 Vista previa
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 360, mb: 3 }}>
              Inicia sesión o crea una cuenta para guardar y descargar tu CV.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "8px" }}
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: "8px" }}
                onClick={() => navigate("/registro", {
                  state: {
                    nombre: formData?.nombre || "", 
                    apellido: formData?.apellido || "", 
                    correo: formData?.email || "",
                  },
                })
              }
              >
                Crear cuenta
              </Button>
            </Box>
          </Box>
        )}

        {user && (
          <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 4,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 500,
              }}
              onClick={handleDownload}
            >
              Descargar CV
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                px: 4,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 500,
              }}
              onClick={handleSaveCV}
            >
              Guardar en mi cuenta
            </Button>
          </Box>
        )}
      </Box>

      {!user && (
        <Typography variant="body2" sx={{ mt: 4, color: "#475569" }}>
          ¿Ya tienes una cuenta?{" "}
          <Button size="small" onClick={() => navigate("/login")}>
            Inicia sesión
          </Button>{" "}
          o{" "}
          <Button size="small" onClick={() => navigate("/registro")}>
            regístrate aquí
          </Button>
        </Typography>
      )}
    </Box>
  );
}
