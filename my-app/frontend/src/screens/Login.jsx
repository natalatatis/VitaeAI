// src/screens/LoginPage.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import theme from "../theme";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasenia }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Bienvenido ${data.usuario.nombre}`);
        navigate("/profile"); 
      } else {
        alert(data.message || "Correo o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: 500,
          padding: 6,
          backgroundColor: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <IconButton
          component={RouterLink}
          to="/"
          sx={{ mb: 2, color: "black" }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontWeight="bold"
          mb={4}
          color="black"
        >
          Iniciar Sesión
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />

          <Box sx={{ textAlign: "right" }}>
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              sx={{ color: theme.palette.secondary.main, fontSize: "0.85rem" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>

          <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>

          <Button
            component={RouterLink}
            to="/registro"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: "#fff",
              "&:hover": { backgroundColor: theme.palette.secondary.dark },
            }}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
