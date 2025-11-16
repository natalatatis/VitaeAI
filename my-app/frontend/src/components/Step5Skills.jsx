import React, { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  Divider,
  Paper,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const nivelesHabilidad = ["Principiante", "Bajo", "Medio", "Alto", "Experto"];
const nivelesIdioma = ["Principiante", "Intermedio", "Avanzado", "Fluido", "Nativo"];

export default function Step5Skills({ formData, setFormData }) {
  const [habilidades, setHabilidades] = useState(
    Array.isArray(formData.habilidades) && formData.habilidades.length
      ? formData.habilidades
      : [{ nombre: "", nivel: "" }]
  );

  const [idiomas, setIdiomas] = useState(
    Array.isArray(formData.idiomas) && formData.idiomas.length
      ? formData.idiomas
      : [{ nombre: "", nivel: "" }]
  );

  const handleChange = (index, field, value, type) => {
    const list = type === "habilidad" ? [...habilidades] : [...idiomas];
    list[index] = { ...list[index], [field]: value };

    if (type === "habilidad") {
      setHabilidades(list);
      setFormData({ ...formData, habilidades: list });
    } else {
      setIdiomas(list);
      setFormData({ ...formData, idiomas: list });
    }
  };

  const handleAdd = (type) => {
    if (type === "habilidad") {
      const newList = [...habilidades, { nombre: "", nivel: "" }];
      setHabilidades(newList);
      setFormData({ ...formData, habilidades: newList });
    } else {
      const newList = [...idiomas, { nombre: "", nivel: "" }];
      setIdiomas(newList);
      setFormData({ ...formData, idiomas: newList });
    }
  };

  const handleRemove = (index, type) => {
    const list = type === "habilidad" ? [...habilidades] : [...idiomas];
    list.splice(index, 1);
    if (type === "habilidad") {
      setHabilidades(list);
      setFormData({ ...formData, habilidades: list });
    } else {
      setIdiomas(list);
      setFormData({ ...formData, idiomas: list });
    }
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
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ mb: 4, color: "#1976D2" }}
        >
          Habilidades e Idiomas
        </Typography>

        {/* 🧠 HABILIDADES */}
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "bold",
            color: "#000",
            mb: 2,
          }}
        >
          <EmojiObjectsIcon color="primary" /> Habilidades
        </Typography>

        {habilidades.map((hab, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Habilidad"
                value={hab.nombre || ""}
                onChange={(e) =>
                  handleChange(index, "nombre", e.target.value, "habilidad")
                }
                fullWidth
              />

              <TextField
                select
                label="Nivel"
                value={hab.nivel || ""}
                onChange={(e) =>
                  handleChange(index, "nivel", e.target.value, "habilidad")
                }
                fullWidth
              >
                {nivelesHabilidad.map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {index > 0 && (
              <Box textAlign="right" mt={1}>
                <Button
                  color="error"
                  size="small"
                  onClick={() => handleRemove(index, "habilidad")}
                >
                  Eliminar
                </Button>
              </Box>
            )}
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => handleAdd("habilidad")}
          sx={{
            mb: 3,
            width: "100%",
            borderRadius: 2,
            borderColor: "primary.main",
            color: "primary.main",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "#fff",
            },
          }}
        >
          Añadir habilidad
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* 🌍 IDIOMAS */}
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "bold",
            color: "#000",
            mb: 2,
          }}
        >
          🌍 Idiomas
        </Typography>

        {idiomas.map((idioma, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Idioma"
                value={idioma.nombre || ""}
                onChange={(e) =>
                  handleChange(index, "nombre", e.target.value, "idioma")
                }
                fullWidth
              />

              <TextField
                select
                label="Nivel"
                value={idioma.nivel || ""}
                onChange={(e) =>
                  handleChange(index, "nivel", e.target.value, "idioma")
                }
                fullWidth
              >
                {nivelesIdioma.map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {index > 0 && (
              <Box textAlign="right" mt={1}>
                <Button
                  color="error"
                  size="small"
                  onClick={() => handleRemove(index, "idioma")}
                >
                  Eliminar
                </Button>
              </Box>
            )}
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => handleAdd("idioma")}
          sx={{
            width: "100%",
            borderRadius: 2,
            borderColor: "primary.main",
            color: "primary.main",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "#fff",
            },
          }}
        >
          Añadir idioma
        </Button>
      </Paper>
    </Box>
  );
}
