import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Typography,
  Box,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";

export default function Step4Educacion({ formData, setFormData }) {
  const [educacion, setEducacion] = useState(
    formData.educacion || [
      { institucion: "", titulo: "", fecha_inicio: null, fecha_fin: null },
    ]
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const list = [...educacion];
    list[index][field] = value;
    setEducacion(list);
    setFormData({ ...formData, educacion: list });
  };

  const handleAdd = () => {
    setEducacion([
      ...educacion,
      { institucion: "", titulo: "", fecha_inicio: null, fecha_fin: null },
    ]);
  };

  const handleRemove = (index) => {
    const list = [...educacion];
    list.splice(index, 1);
    setEducacion(list);
    setFormData({ ...formData, educacion: list });
  };

  const handleSave = async () => {
    if (!formData.id_usuario) {
      alert("⚠️ No se encontró el ID del usuario.");
      return;
    }

    setLoading(true);
    try {
      // Usar Promise.all es más eficiente aquí (como se sugirió en la revisión anterior)
      const savePromises = educacion
        .filter(edu => edu.institucion && edu.titulo && edu.fecha_inicio && edu.fecha_fin)
        .map(edu => 
            axios.post("http://localhost:3001/api/educacion", {
                institucion: edu.institucion,
                titulo: edu.titulo,
                fecha_inicio: edu.fecha_inicio,
                fecha_fin: edu.fecha_fin,
                id_usuario: formData.id_usuario,
            })
        );
      
      await Promise.all(savePromises); 

      alert("✅ Educación guardada correctamente");
    } catch (error) {
      console.error("❌ Error al guardar educación:", error);
      alert("Ocurrió un error al guardar la educación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
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
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Formación Académica
          </Typography>

          {educacion.map((edu, index) => (
            <Box
              key={index}
              sx={{
                mb: 4,
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#1976D2",
                    fontWeight: "bold",
                  }}
                >
                  <SchoolIcon /> Educación #{index + 1}
                </Typography>

                {index > 0 && (
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleRemove(index)}
                  >
                    Eliminar
                  </Button>
                )}
              </Box>

              {/* Inputs stacked vertically */}
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Institución"
                  value={edu.institucion}
                  onChange={(e) =>
                    handleChange(index, "institucion", e.target.value)
                  }
                  fullWidth
                />

                <TextField
                  label="Título o carrera"
                  value={edu.titulo}
                  onChange={(e) =>
                    handleChange(index, "titulo", e.target.value)
                  }
                  fullWidth
                />

                <Box display="flex" gap={2}>
                  <DatePicker
                    views={["year", "month"]}
                    label="Fecha de inicio"
                    value={edu.fecha_inicio}
                    onChange={(newValue) =>
                      handleChange(index, "fecha_inicio", newValue)
                    }
                    slotProps={{
                      textField: { fullWidth: true, variant: "outlined" },
                    }}
                  />

                  <DatePicker
                    views={["year", "month"]}
                    label="Fecha de finalización"
                    value={edu.fecha_fin}
                    onChange={(newValue) =>
                      handleChange(index, "fecha_fin", newValue)
                    }
                    slotProps={{
                      textField: { fullWidth: true, variant: "outlined" },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
          
          {/* Botón de añadir: se usará el estilizado, quitando el duplicado que estaba mal anidado */}
          <Box textAlign="center" mt={2}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{
                mb: 2, // Añadimos margen inferior para separarlo del Divider
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Añadir otra formación
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

        </Paper>
      </Box>
    </LocalizationProvider>
  );
}