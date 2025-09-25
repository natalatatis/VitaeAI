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
import { Link as RouterLink } from "react-router-dom";

export default function RegistroPage() {
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
          <TextField label="Nombre" variant="outlined" fullWidth />

          <TextField label="Apellidos" variant="outlined" fullWidth />

          <TextField label="Correo Electrónico" variant="outlined" fullWidth />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Confirmar contraseña"
            type="password"
            variant="outlined"
            fullWidth
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
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
