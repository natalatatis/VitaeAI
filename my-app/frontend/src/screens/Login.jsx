import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import theme from "../theme";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ Capture redirect intent
  useEffect(() => {
    if (location.state?.from === "/preview") {
      localStorage.setItem("redirectAfterLogin", "/preview");
      localStorage.setItem(
        "previewState",
        JSON.stringify(location.state.previewState)
      );
    }
  }, [location.state]);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasenia }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message || "Credenciales incorrectas");

      // Save user
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // ⭐ Check redirect
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      const previewState = localStorage.getItem("previewState");

      if (redirectPath === "/preview" && previewState) {
        const parsed = JSON.parse(previewState);

        localStorage.removeItem("redirectAfterLogin");
        localStorage.removeItem("previewState");

        return navigate("/preview", {
          replace: true,
          state: parsed,
        });
      }

      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Error del servidor");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: 500,
          p: 6,
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <IconButton component={RouterLink} to="/" sx={{ mb: 2, color: "black" }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
          Iniciar Sesión
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Correo Electrónico"
            fullWidth
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />

          <Button
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
            state={location.state} // ⭐ Keeps preview redirect when going to register
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
