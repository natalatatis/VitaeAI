import React, { useEffect, useState } from "react";
import {
  Box, Button, Typography, Avatar, Paper, Grid, Divider,
  IconButton, CircularProgress, Fade, Tooltip
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
import { safeParse, normalizeFormData } from "../utils/safeData";

const templatesMap = { 1: Plantilla1, 2: Plantilla2, 3: Plantilla3 };

export default function Profile() {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCvId, setHoveredCvId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const storedStr = localStorage.getItem("usuario");
        let storedUser = null;
        try {
          storedUser = storedStr && storedStr !== "null" ? JSON.parse(storedStr) : null;
        } catch {
          localStorage.removeItem("usuario");
          navigate("/login");
          return;
        }

        if (!storedUser?.correo) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:3001/usuarios");
        const users = await res.json();
        const found = users.find((u) => u.correo === storedUser.correo);

        if (!found) {
          navigate("/login");
          return;
        }

        setUser(found);

        const cvRes = await fetch(`http://localhost:3001/api/user/${found.id_usuario}`);
        const list = (await cvRes.json()) || [];

        const normalized = list.map((cv) => ({
          ...cv,
          data: normalizeFormData(cv.data)
        }));

        setCvs(normalized);
      } catch (e) {
        console.error("Profile error:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este CV?")) return;

    await fetch(`http://localhost:3001/api/cv/${id}`, { method: "DELETE" });
    setCvs((prev) => prev.filter((cv) => cv.id !== id));
  };

  const handleView = (cv) => {
    navigate("/preview", {
      state: {
        selectedTemplate: cv.template,
        formData: cv.data,
      },
    });
  };

  const renderMiniPreview = (cv) => {
    const Template = templatesMap[cv.template];
    if (!Template) return null;

    return (
      <Box
        sx={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translate(-50%, -100%)",
          width: 260,
          height: 340,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          overflow: "hidden",
          p: 1,
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        <Box sx={{ transform: "scale(0.3)", transformOrigin: "top left", width: 800 }}>
          <Template formData={cv.data} editMode={false} setFormData={() => {}} />
        </Box>
      </Box>
    );
  };

  if (loading)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ minHeight: "100vh", background: theme.palette.background.default }}>
      <Header />

      <Fade in>
        <Box sx={{ maxWidth: 900, mx: "auto", py: 6, px: 2 }}>
          {/* USER CARD */}
          <Paper sx={{ p: 4, mb: 4, borderRadius: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 70, height: 70, mr: 3 }}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5">
                  {user?.nombre} {user?.apellido}
                </Typography>
                <Typography>{user?.correo}</Typography>
              </Box>
            </Box>

            <Button
              color="error"
              variant="contained"
              onClick={() => {
                localStorage.removeItem("usuario");
                navigate("/");
              }}
            >
              Cerrar sesión
            </Button>
          </Paper>

          <Typography variant="h5" fontWeight="bold">
            Mis Currículums
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {/* ADD NEW CV */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                onClick={() => navigate("/wizard")}
                sx={{
                  height: 180,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `2px dashed ${theme.palette.primary.main}`,
                  cursor: "pointer",
                  borderRadius: 4,
                  "&:hover": { background: "#e6f4ff" },
                }}
              >
                <AddIcon fontSize="large" color="primary" />
                <Typography variant="h6">Crear Nuevo CV</Typography>
              </Paper>
            </Grid>

            {/* CV CARDS */}
            {cvs.map((cv) => (
              <Grid item xs={12} sm={6} md={4} key={cv.id}>
                <Box
                  sx={{ position: "relative" }}
                  onMouseEnter={() => setHoveredCvId(cv.id)}
                  onMouseLeave={() => setHoveredCvId(null)}
                >
                  <Paper
                    sx={{
                      height: 180,
                      p: 2,
                      borderRadius: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      "&:hover": { boxShadow: `0 0 4px ${theme.palette.primary.main}` },
                    }}
                  >
                    <Box sx={{ overflow: "hidden" }}>
                      <Typography noWrap onClick={() => handleView(cv)} sx={{ cursor: "pointer" }}>
                        {cv.title}
                      </Typography>
                      <Typography variant="caption">
                        {new Date(cv.updated_at).toLocaleDateString("es-ES")}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => handleDelete(cv.id)} size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Abrir CV">
                        <ChevronRightIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleView(cv)}
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
