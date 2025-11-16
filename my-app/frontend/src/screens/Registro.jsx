import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Link, IconButton } from "@mui/material";
import theme from "../theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

export default function RegistroPage() {
  const location = useLocation();

  // If user arrived from Wizard, these values exist
  const {
    nombre: nombreInicial,
    apellido: apellidoInicial,
    correo: correoInicial,
    cvData,
    selectedTemplate,
  } = location.state || {};

  const cameFromWizard = !!cvData; // ⭐ key flag

  const [nombre, setNombre] = useState(nombreInicial || "");
  const [apellido, setApellido] = useState(apellidoInicial || "");
  const [correo, setCorreo] = useState(correoInicial || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (nombreInicial || correoInicial) {
      setNombre(nombreInicial || "");
      setApellido(apellidoInicial || "");
      setCorreo(correoInicial || "");
    }
  }, [nombreInicial, apellidoInicial, correoInicial]);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

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

      // Save user locally
      localStorage.setItem("user", JSON.stringify(data));

      // ⭐ If coming from the wizard → create CV + go to preview
      if (cameFromWizard && selectedTemplate && cvData) {
        await fetch("http://localhost:3001/api/cv", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: data.id_usuario,
            title: "Mi CV",
            template: selectedTemplate,
            data: cvData,
          }),
        });

        return navigate("/preview", {
          state: {
            selectedTemplate,
            formData: cvData,
          },
        });
      }

      // ⭐ If NOT from wizard → send to login
      return navigate("/login");

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
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        backgroundColor: "#f9fafb",
      }}
    >
      <Box
        sx={{
          width: 500,
          padding: 6,
          backgroundColor: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          borderRadius: 3,
        }}
      >
        <IconButton component={RouterLink} to="/" sx={{ mb: 2, color: "black" }}>
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
          Crea tu cuenta
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Nombre"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <TextField
            label="Apellido"
            fullWidth
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Confirmar contraseña"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Box sx={{ textAlign: "right" }}>
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              sx={{ color: theme.palette.secondary.main, fontSize: "0.85rem" }}
            >
              ¿Ya tienes una cuenta? Presiona aquí
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
