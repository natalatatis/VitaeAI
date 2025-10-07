import React from "react";
import { TextField, Grid, Typography, Box } from "@mui/material";

export default function Step3Exp({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { value } = e.target;

    // Guardamos toda la experiencia en un solo campo
    setFormData({
      ...formData,
      experiencia: [{ descripcion: value }],
    });
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
        }}
      >
        <Typography variant="h5" gutterBottom mb={3} textAlign="center">
          Cuéntame sobre tu{" "}
          <Box component="span" fontWeight="bold">
            experiencia laboral
          </Box>
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }} alignContent="center">
          <Grid item xs={12}>
            <TextField
              label="Tu experiencia"
              name="descripcion"
              value={formData.experiencia[0]?.descripcion || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={6} // más espacio para escribir
              placeholder="Ej: Trabajé 2 años como desarrollador web en XYZ Company, gestionando proyectos de frontend y backend..."
              required
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
