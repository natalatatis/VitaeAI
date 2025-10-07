// src/screens/Profile.jsx
import React from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const handleStartWizard = () => {
    navigate("/wizard"); // Redirige al wizard
  };

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Por ejemplo, a editar perfil
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 4, width: "100%", textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido a tu perfil!
        </Typography>

        <Typography variant="body1" gutterBottom>
          Aquí puedes ver tu información y empezar a crear tu perfil completo.
        </Typography>

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleStartWizard}>
            Empezar Wizard
          </Button>

          <Button variant="outlined" color="secondary" onClick={handleEditProfile}>
            Editar Perfil
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
