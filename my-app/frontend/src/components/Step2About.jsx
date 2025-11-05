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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" gutterBottom mb={3} textAlign="center">
          Escribe{" "}
          <Box component="span" fontWeight="bold">
            quién eres
          </Box>
        </Typography>

        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} sx={{ flexGrow: 1 }}>
            <TextField
              label="Acerca de ti"
              name="acercaDe"
              value={formData.acercaDe}
              onChange={handleChange}
              multiline
              minRows={10}
              placeholder="Ej: Soy estudiante de ingeniería con interés en el desarrollo web, trabajo en equipo..."
              fullWidth
              required
              sx={{
                height: "100%",
                "& .MuiInputBase-root": {
                  height: "100%",
                },
                "& textarea": {
                  height: "100% !important",
                  resize: "none",
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
