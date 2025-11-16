import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  IconButton,
  TextField,
  CircularProgress,
  Fade,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import Header from "../components/Header";

import Plantilla1 from "../plantillas/Plantilla1";
import Plantilla2 from "../plantillas/Plantilla2";
import Plantilla3 from "../plantillas/Plantilla3";

const templatesMap = {
  1: Plantilla1,
  2: Plantilla2,
  3: Plantilla3,
};

export default function Profile() {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [hoveredCvId, setHoveredCvId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/usuarios")
      .then((res) => res.json())
      .then((data) => {
        const foundUser = data.find((u) => u.correo === storedUser.correo);
        setUser(foundUser);

        if (foundUser?.id_usuario) {
          fetch(`http://localhost:3001/api/${foundUser.id_usuario}`)
            .then((res) => res.json())
            .then((data) => setCvs(data))
            .catch((err) => console.error("Error fetching CVs:", err));
        }
      })
      .catch((err) => console.error("Error fetching user:", err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleCreateNewCv = () => navigate("/wizard");

  const handleViewCv = (cv) => {
    navigate("/preview", {
      state: {
        selectedTemplate: cv.template,
        formData: { ...cv.data, title: cv.title, id: cv.id },
      },
    });
  };

  const handleDelete = async (cvId) => {
    if (!window.confirm("¿Seguro que deseas eliminar este CV?")) return;
    try {
      await fetch(`http://localhost:3001/api/${cvId}`, { method: "DELETE" });
      setCvs((prev) => prev.filter((cv) => cv.id !== cvId));
    } catch (err) {
      console.error("Error deleting CV:", err);
    }
  };

  const renderMiniPreview = (cv) => {
    const TemplateComponent = templatesMap[cv.template];
    if (!TemplateComponent) return null;

    return (
      <Box
        sx={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translate(-50%, -100%)",
          width: 260,
          height: 340,
          bgcolor: "#ffffff",
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          overflow: "hidden",
          p: 1,
          zIndex: 20,
          pointerEvents: "none",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            transform: "scale(0.3)",
            transformOrigin: "top left",
            width: "800px",
          }}
        >
          <TemplateComponent
            formData={cv.data}
            editMode={false}
            setFormData={() => {}}
            onAiHelp={() => {}}
          />
        </Box>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
      <Header />

      <Fade in>
        <Box sx={{ maxWidth: 900, mx: "auto", py: 6, px: 2 }}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 4,
              backdropFilter: "blur(6px)",
              background: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  width: 70,
                  height: 70,
                  mr: 3,
                  boxShadow: 2,
                }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {user ? `${user.nombre} ${user.apellido}` : "Usuario"}
                </Typography>
                <Typography color="text.secondary">{user?.correo || "Sin correo"}</Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.removeItem("usuario");
                navigate("/");
              }}
            >
              Cerrar sesión
            </Button>
          </Paper>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Mis Currículums
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={2}
                onClick={handleCreateNewCv}
                sx={{
                  height: "180px",
                  textAlign: "center",
                  border: `2px dashed ${theme.palette.primary.main}`,
                  borderRadius: 4,
                  p: 4,
                  cursor: "pointer",
                  backgroundColor: "rgba(245, 250, 255, 0.8)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "#e0f2ff",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <IconButton color="primary" size="large" sx={{ mb: 1 }}>
                  <AddIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Crear Nuevo CV
                </Typography>
                <Typography color="text.secondary" fontSize="0.9rem">
                  Comienza tu próximo currículum profesional.
                </Typography>
              </Paper>
            </Grid>

            {cvs.map((cv) => (
              <Grid item key={cv.id} xs={12} sm={6} md={4}>
                <Box
                  sx={{ position: "relative" }}
                  onMouseEnter={() => setHoveredCvId(cv.id)}
                  onMouseLeave={() => setHoveredCvId(null)}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      height: "180px",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 3,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        fontWeight="medium"
                        sx={{
                          cursor: "pointer",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => handleViewCv(cv)}
                      >
                        {cv.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Última edición: {new Date(cv.updated_at).toLocaleDateString("es-ES")}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <Tooltip title="Eliminar CV">
                        <IconButton color="error" onClick={() => handleDelete(cv.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Abrir CV">
                        <ChevronRightIcon
                          color="action"
                          onClick={() => handleViewCv(cv)}
                          sx={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    </Box>
                  </Paper>

                  {hoveredCvId === cv.id && renderMiniPreview(cv)}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
}
