import React from "react";
import { TextField, Grid, Typography, Box } from "@mui/material";

export default function Step4Educacion({ formData, setFormData }) {
  const handleChange = (e) => {
    const { value } = e.target;

    setFormData({
      ...formData,
      educacion: [{ descripcion: value }],
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
            formación académica
          </Box>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Tu educación"
              name="descripcion"
              value={formData.educacion[0]?.descripcion || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={6}
              placeholder="Ej: Licenciatura en Ingeniería en Informática, Universidad XYZ, 2018-2022. Cursos adicionales en desarrollo web y bases de datos."
              required
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
