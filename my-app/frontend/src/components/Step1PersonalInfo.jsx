import React from "react";
import { TextField, Grid, Typography, Box} from "@mui/material";

export default function Step1PersonalInfo({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    setFormData({ 
        ...formData, [e.target.name]: e.target.value
     });
  };

  return(
    <Box
      sx={{
        minHeight: "100vh",
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
          padding: 6,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)", 
        }}
      >
    <Typography variant="h5" gutterBottom mb={3} textAlign={"left"}>
      Dime tu <Typography variant="h5" gutterBottom mb={3} textAlign={"center"} fontWeight={"bold"}>nombre completo, ciudad, número de teléfono y tu correo electrónico </Typography>
    </Typography>
    
    <Grid container spacing={3} sx={{ mt: 1}} alignContent={"center"}>  
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
        <Grid item xs={12} sm={6} >
            <TextField label="Telefono" name="telefono" value={formData.telefono} onChange={handleChange} fullWidth required />
        </Grid>
    </Grid>

    <Grid container spacing={3} sx={{ mt: 1}}>  
        <Grid item xs={12} sm={6} >
            <TextField label="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} fullWidth required />
        </Grid>
    </Grid>


    </Box>

    </Box>

  )

  };