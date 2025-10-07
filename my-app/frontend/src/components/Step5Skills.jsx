import React from "react";
import { TextField, Grid, Typography, Box } from "@mui/material";

export default function Step5Skills({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { value } = e.target;

    // Guardamos todas las habilidades en un solo campo
    setFormData({
      ...formData,
      habilidades: [value],
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
          Cuéntame sobre tus{" "}
          <Box component="span" fontWeight="bold">
            habilidades
          </Box>
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }} alignContent="center">
          <Grid item xs={12}>
            <TextField
              label="Habilidades"
              name="habilidades"
              value={formData.habilidades[0] || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              placeholder="Ej: JavaScript, React, Node.js, SQL, Python, Cloud computing..."
              required
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
