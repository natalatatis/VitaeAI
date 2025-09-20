// src/screens/LandingPage.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import theme from "../theme";
import DescriptionIcon from "@mui/icons-material/Description";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from '@mui/icons-material/Edit';
import { href } from "react-router-dom";

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* HEADER */}
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">VitaeAI</Typography>
          <Box>
            <Button color="inherit" href="/login">Login</Button>
            <Button color="inherit" href="/registro">Registro</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Crea tu <span style={{ color: theme.palette.primary.main }}>CV profesional</span> en minutos
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Simple. Rápido. Efectivo.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                backgroundColor: theme.palette.secondary.main,
                "&:hover": { backgroundColor: theme.palette.customLight.main },
              }}
            >
              Hacer mi curriculum
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* FEATURES SECTION */}
      <Box sx={{ py: 8, backgroundColor: "#f9f9f9" }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            ¿Por qué usar VitaeAI?
          </Typography>
          <Grid container spacing={6} justifyContent="center" sx={{ mt: 4 }}>
            {[
              { icon: <DescriptionIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />, title: "Plantillas profesionales", desc: "Diseños modernos adaptados a lo que buscan los reclutadores." },
              { icon: <PsychologyIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />, title: "Inteligencia Artificial", desc: "Tu experiencia se transforma en un CV optimizado en segundos." },
              { icon: <CheckCircleIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />, title: "Fácil de usar", desc: "No necesitas conocimientos de diseño, todo es guiado paso a paso." },
              { icon: <PictureAsPdfIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />, title: "Listo para descargar", desc: "Exporta en PDF y empieza a aplicar de inmediato." },
            ].map((feature, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper 
                  elevation={3} 
                  sx={{ p: 3, textAlign: "center", transition: "transform 0.3s", "&:hover": { transform: "translateY(-10px)" } }}
                >
                  {feature.icon}
                  <Typography variant="h6" fontWeight="bold" mt={2}>{feature.title}</Typography>
                  <Typography color="text.secondary">{feature.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* CTA REPETIDO */}
          <Box textAlign="center" mt={6}>
            <Button variant="contained" size="large" sx={{ backgroundColor: theme.palette.secondary.main }} href="/registro">
              Comenzar ahora
            </Button>
          </Box>
        </Container>
      </Box>

      {/* como funciona */}

    <Box sx={{ py: 8 }}>
    <Container>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Cómo funciona
        </Typography>
        <Grid container spacing={6} sx={{ mt: 4 }}>
        {[
            { icon: <AccountCircleIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />, title: "1. Ingresa tu info", desc: "Agrega tus datos, experiencia y educación en un formulario sencillo." },
            { icon: <RocketLaunchIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />, title: "2. Genera tu CV", desc: "La IA convierte tu información en un CV profesional en segundos." },
            { icon: <EditIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />, title: "3. Ajusta a tu gusto", desc: "Puedes modificar tu CV para que se ajuste aún más a tus necesidades." },
            { icon: <DownloadIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />, title: "4. Descarga y aplica", desc: "Exporta tu CV en PDF y comienza a postular a tus empleos ideales." },
        ].map((step, i) => (
            <Grid item xs={12} md={3} key={i}>
            <Paper 
                elevation={3} 
                sx={{ p: 3, textAlign: "center", transition: "transform 0.3s", "&:hover": { transform: "translateY(-10px)" } }}
            >
                {step.icon}
                <Typography variant="h6" fontWeight="bold" mt={2}>{step.title}</Typography>
                <Typography color="text.secondary">{step.desc}</Typography>
            </Paper>
            </Grid>
        ))}
        </Grid>
    </Container>
    </Box>


    </Box>
  );
}
