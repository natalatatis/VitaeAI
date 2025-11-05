import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  IconButton,
  Chip,
  AppBar,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import Header from "../components/Header";

export default function Profile() {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const hasCvs = cvs.length > 0;

  const handleCreateNewCv = () => navigate("/wizard");
  const handleViewCv = (cvName) => console.log(`Viewing ${cvName}`);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Header />
      <Box sx={{ maxWidth: 900, mx: "auto", py: 6, px: 2 }}>
        {/* Profile Info */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.secondary.main,
                width: 60,
                height: 60,
                mr: 2,
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Juan Pérez
              </Typography>
              <Typography color="text.secondary">
                juan.perez@email.com
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            sx={{
              mt: 1,
              textTransform: "none",
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
            }}
          >
            Editar perfil
          </Button>
        </Paper>

        {/* CV List */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Mis Curriculums
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {!hasCvs ? (
            <Grid item xs={12}>
              <Box
                onClick={handleCreateNewCv}
                sx={{
                  textAlign: "center",
                  border: `2px dashed ${theme.palette.primary.main}`,
                  borderRadius: 2,
                  p: 4,
                  cursor: "pointer",
                  backgroundColor: "#f5faff",
                  "&:hover": { backgroundColor: "#e0f2ff" },
                }}
              >
                <IconButton
                  color="primary"
                  size="large"
                  sx={{ mb: 1, bgcolor: "#e0f2ff" }}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  gutterBottom
                >
                  Crear Nuevo CV
                </Typography>
                <Typography color="text.secondary">
                  Comienza tu próximo currículum profesional.
                </Typography>
              </Box>
            </Grid>
          ) : (
            cvs.map((cv) => (
              <Grid item key={cv.id} xs={12} sm={6} md={4}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderRadius: 2,
                    "&:hover": {
                      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                    },
                  }}
                  onClick={() => handleViewCv(cv.name)}
                >
                  <Box>
                    <Typography fontWeight="medium">{cv.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Última edición: {cv.date}
                    </Typography>
                  </Box>
                  <ChevronRightIcon color="action" />
                </Paper>
              </Grid>
            ))
          )}

          {hasCvs && (
            <Grid item xs={12} sm={6} md={4}>
              <Chip
                icon={<AddIcon />}
                label="Crear Nuevo CV"
                onClick={handleCreateNewCv}
                variant="outlined"
                color="primary"
                sx={{
                  px: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  height: "auto",
                  borderRadius: 2,
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#f5faff" },
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
