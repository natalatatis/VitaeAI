// src/screens/LoginPage.jsx
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
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useState} from "react";

export default function LoginPage() {
  //const [usuario, setUsuario] = useState("");
  //const [password, setPassword] = useState("");
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

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField label="Usuario" variant="outlined" fullWidth />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
          />

          <Box sx={{ textAlign: "right" }}>
            <Link
              href="#"
              underline="hover"
              sx={{ color: theme.palette.secondary.main, fontSize: "0.85rem" }}
            >
              Olvidé mi contraseña
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
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
