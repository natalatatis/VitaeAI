// src/screens/RegistroPage.jsx
import React from "react";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {useState} from "react";

export default function RegistroPage() {
  //Datos del usuario
  const[nombre, setNombre] = useState(""); 
  const[apellido, setApellido] = useState(""); 
  const[correo, setCorreo] = useState(""); 
  const[password, setPassword] = useState(""); 
  const[confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  //Función para manejar el registro
  const handleSubmit = async (e) => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
try {
      const res = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, correo, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Usuario ${data.nombre} creado con éxito`);
        navigate("/login"); // redirige al login
      } else {
        alert(`Error: ${data.error}`);
      }
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
      }}
    >
      <Box
        sx={{
          width: 500,
          padding: 6,
          backgroundColor: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)", // subtle modern shadow
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
          Crea tu cuenta
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField label="Nombre" 
          variant="outlined" 
          fullWidth 
          value={nombre}
           onChange={(e) => setNombre(e.target.value)} 
           required />

          <TextField 
          label="Apellido" 
          variant="outlined" 
          fullWidth 
          value={apellido}
           onChange={(e) => setApellido(e.target.value)}
            required />

          <TextField
           label="Correo Electrónico" 
           variant="outlined"
            fullWidth 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            required />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
             onChange={(e) => setPassword(e.target.value)} 
             required
          />

          <TextField
            label="Confirmar contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)} 
             required
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
            type="button"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: "#fff",
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
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
