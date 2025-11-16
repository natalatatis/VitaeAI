import React from "react";
import { TextField, Typography, Box, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function Step1PersonalInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 650,
          p: 5,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ mb: 4, color: "#1976D2" }}
        >
          Información Personal
        </Typography>

        {/* Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <PersonIcon sx={{ fontSize: 50, color: "#1976D2" }} />
        </Box>

        {/* Inputs */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{maxLength: 8}}
             />

          <TextField
            label="Nacionalidad"
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>
      </Paper>
    </Box>
  );
}
