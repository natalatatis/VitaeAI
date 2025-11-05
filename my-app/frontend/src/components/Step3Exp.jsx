import React, { useState } from "react";
import { TextField, Grid, Typography, Box, Button } from "@mui/material";

export default function Step3Exp({ formData, setFormData, nextStep }) {
  const [sinExperiencia, setSinExperiencia] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      experiencia: [
        {
          ...formData.experiencia?.[0],
          [name]: value,
        },
      ],
    });
  };

  const handleNoExperiencia = () => {
    setFormData({
      ...formData,
      experiencia: [
        {
          empresa: "",
          puesto: "",
          fecha_inicio: "",
          fecha_fin: "",
          descripcion: "",
          sinExperiencia: true,
        },
      ],
    });
    setSinExperiencia(true);
    nextStep();
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      experiencia: [
        {
          ...formData.experiencia?.[0],
          sinExperiencia: false,
        },
      ],
    });
    nextStep();
  };

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        mt: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: 500,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" gutterBottom mb={3} textAlign="center">
          Cuéntame sobre tu{" "}
          <Box component="span" fontWeight="bold">
            experiencia laboral
          </Box>
        </Typography>

        {!sinExperiencia && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Empresa"
                name="empresa"
                value={formData.experiencia?.[0]?.empresa || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Puesto"
                name="puesto"
                value={formData.experiencia?.[0]?.puesto || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Fecha de inicio"
                name="fecha_inicio"
                type="date"
                value={formData.experiencia?.[0]?.fecha_inicio || ""}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Fecha de finalización"
                name="fecha_fin"
                type="date"
                value={formData.experiencia?.[0]?.fecha_fin || ""}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descripción de tareas"
                name="descripcion"
                multiline
                minRows={5}
                placeholder="Ej: Trabajé 2 años como desarrollador web en XYZ Company, gestionando proyectos de frontend y backend..."
                value={formData.experiencia?.[0]?.descripcion || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        )}

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="text"
            color="secondary"
            onClick={handleNoExperiencia}
          >
            No tengo experiencia laboral
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
