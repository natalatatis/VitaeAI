import React, { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  Paper,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { es } from "date-fns/locale";
import AddIcon from "@mui/icons-material/Add";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

export default function Step3Exp({ formData, setFormData, nextStep }) {
  const [sinExperiencia, setSinExperiencia] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const nuevasExp = [...(formData.experiencia || [])];
    nuevasExp[index] = { ...nuevasExp[index], [name]: value };
    setFormData({ ...formData, experiencia: nuevasExp });
  };

  const handleMonthChange = (index, name, date) => {
    if (!date) return;
    const formatted = date.toLocaleString("es-ES", {
      month: "long",
      year: "numeric",
    });
    const nuevasExp = [...(formData.experiencia || [])];
    nuevasExp[index] = { ...nuevasExp[index], [name]: formatted };
    setFormData({ ...formData, experiencia: nuevasExp });
  };

  const handleActualmente = (index) => {
    const nuevasExp = [...(formData.experiencia || [])];
    nuevasExp[index].actualmente = !nuevasExp[index].actualmente;
    if (nuevasExp[index].actualmente) nuevasExp[index].fecha_fin = "";
    setFormData({ ...formData, experiencia: nuevasExp });
  };

  const agregarExperiencia = () => {
    const nuevasExp = [
      ...(formData.experiencia || []),
      {
        empresa: "",
        puesto: "",
        fecha_inicio: "",
        fecha_fin: "",
        descripcion: "",
        actualmente: false,
      },
    ];
    setFormData({ ...formData, experiencia: nuevasExp });
  };

  const eliminarExperiencia = (index) => {
    const nuevasExp = [...(formData.experiencia || [])];
    nuevasExp.splice(index, 1);
    setFormData({ ...formData, experiencia: nuevasExp });
  };

  const handleNoExperiencia = () => {
    setFormData({
      ...formData,
      experiencia: [{ sinExperiencia: true }],
    });
    setSinExperiencia(true);
    nextStep();
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
            Experiencia Laboral
          </Typography>

          {!sinExperiencia &&
            (formData.experiencia || []).map((exp, index) => (
              <Box
                key={index}
                sx={{
                  mb: 4,
                  p: 3,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >
                {/* Title */}
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
                    <WorkOutlineIcon /> Trabajo #{index + 1}
                  </Typography>

                  {index > 0 && (
                    <Button
                      color="error"
                      size="small"
                      onClick={() => eliminarExperiencia(index)}
                    >
                      Eliminar
                    </Button>
                  )}
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Empresa"
                    name="empresa"
                    value={exp.empresa || ""}
                    onChange={(e) => handleChange(index, e)}
                    fullWidth
                  />

                  <TextField
                    label="Puesto"
                    name="puesto"
                    value={exp.puesto || ""}
                    onChange={(e) => handleChange(index, e)}
                    fullWidth
                  />

                  <Box display="flex" gap={2}>
                    <DatePicker
                      views={["year", "month"]}
                      label="Fecha de inicio"
                      minDate={new Date("1980-01-01")}
                      value={exp.fecha_inicio ? new Date(exp.fecha_inicio) : null}
                      onChange={(date) =>
                        handleMonthChange(index, "fecha_inicio", date)
                      }
                      slotProps={{
                        textField: { fullWidth: true, variant: "outlined" },
                      }}
                    />

                    <DatePicker
                      views={["year", "month"]}
                      label="Fecha de finalización"
                      disabled={exp.actualmente}
                      value={exp.fecha_fin ? new Date(exp.fecha_fin) : null}
                      onChange={(date) =>
                        handleMonthChange(index, "fecha_fin", date)
                      }
                      slotProps={{
                        textField: { fullWidth: true, variant: "outlined" },
                      }}
                    />
                  </Box>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={exp.actualmente || false}
                        onChange={() => handleActualmente(index)}
                      />
                    }
                    label="Actualmente trabajo aquí"
                  />

                  <TextField
                    label="Descripción de tareas"
                    name="descripcion"
                    multiline
                    minRows={4}
                    placeholder="Ejemplo: Desarrollé proyectos web, lideré equipos, implementé APIs..."
                    value={exp.descripcion || ""}
                    onChange={(e) => handleChange(index, e)}
                    fullWidth
                  />
                </Box>
              </Box>
            ))}

          {!sinExperiencia && (
            <Box textAlign="center" mt={2}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={agregarExperiencia}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Agregar otra experiencia
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Box textAlign="center">
            <Button
              variant="text"
              color="secondary"
              onClick={handleNoExperiencia}
            >
              No tengo experiencia laboral
            </Button>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
