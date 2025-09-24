import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

export default function Step1PersonalInfo({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    setFormData({ 
        ...formData, [e.target.name]: e.target.value
     });
  };

  return(
    <>
    <Typography variant="h5" gutterBottom mb={3} fontWeight="bold">
      Información Personal
    </Typography>
    <Grid container spacing={3} sx={{ mt: 1}}>  
        <Grid item xs={12} sm={6}>
            <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth required />
        </Grid>
    </Grid>

    <Grid container spacing={3} sx={{ mt: 1}}>  
        <Grid item xs={12} sm={6}>
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth required />
        </Grid>
    </Grid>

        <Grid container spacing={3} sx={{ mt: 1}}>  
        <Grid item xs={12} sm={6}>
            <TextField label="Telefono" name="telefono" value={formData.telefono} onChange={handleChange} fullWidth required />
        </Grid>
    </Grid>
    </>

  )

  };