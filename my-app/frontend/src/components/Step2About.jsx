import React from "react";
import { TextField, Grid, Typography, Box } from "@mui/material";

export default function Step2About({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
          Escribe{" "}
          <Box component="span" fontWeight="bold">
            quién eres
          </Box>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Acerca de ti"
              name="acercaDe"
              value={formData.acercaDe}
              onChange={handleChange}
              multiline
              rows={4}
              placeholder="Ej: Soy estudiante de ingeniería con interés en el desarrollo web, trabajo en equipo..."
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
