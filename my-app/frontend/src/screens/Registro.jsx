import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import theme from "../theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

export default function RegistroPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Coming from preview/login
  const cameFromPreview = location.state?.from === "/preview";

  const [nombre, setNombre] = useState(location.state?.nombre || "");
  const [apellido, setApellido] = useState(location.state?.apellido || "");
  const [correo, setCorreo] = useState(location.state?.correo || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword)
      return alert("Las contraseñas no coinciden");

    try {
      const res = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          correo,
          contrasenia: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) return alert(`Error: ${data.error}`);

      // ⭐ ALWAYS redirect back to login with state
      // LoginPage will handle the preview redirect if needed
      return navigate("/login", {
        state: location.state, // keeps previewState + from="/preview"
      });

    } catch (err) {
      console.error(err);
      alert("Error al crear usuario");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9fafb",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: 500,
          p: 6,
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          borderRadius: 3,
        }}
      >
        <IconButton component={RouterLink} to="/" sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
          Crea tu cuenta
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <TextField label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          <TextField label="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />

          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Box sx={{ textAlign: "right" }}>
            <Link component={RouterLink} to="/login" underline="hover">
              ¿Ya tienes una cuenta?
            </Link>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: "#fff",
              "&:hover": { backgroundColor: theme.palette.secondary.dark },
            }}
            onClick={handleSubmit}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
