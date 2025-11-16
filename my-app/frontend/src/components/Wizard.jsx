import React, { useState } from "react";
import { 
  Box, Button, Stepper, Step, StepLabel, Container, 
  IconButton, useTheme, useMediaQuery 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2About from "./Step2About";
import Step3Exp from "./Step3Exp";
import Step4Educacion from "./Step4Educacion";
import Step5Skills from "./Step5Skills";
import TemplateSelector from "./TemplateSelector";

const pasos = ["Información Personal", "Acerca de", "Experiencia", "Educación", "Habilidades"];

export default function Wizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    nacionalidad: "",
    acercaDe: "",
    experiencia: [{ descripcion: "" }],
    educacion: [{ descripcion: "" }],
    habilidades: [""],
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleLanding = () => navigate("/");

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1PersonalInfo formData={formData} setFormData={setFormData} />;
      case 1:
        return <Step2About formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step3Exp formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step4Educacion formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step5Skills formData={formData} setFormData={setFormData} />;
      default:
        return <TemplateSelector formData={formData} />;
    }
  };

  const isTemplateStep = activeStep >= pasos.length;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        px: isSmallScreen ? 2 : 0,
        position: "relative",
      }}
    >
      {/* Header and Stepper */}
      {!isTemplateStep && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, width: "100%" }}>
          <IconButton
            onClick={handleLanding}
            color="primary"
            sx={{
              mr: 2,
              p: 1,
              backgroundColor: "#f0f4ff",
              "&:hover": { backgroundColor: "#dbeafe" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Stepper
            activeStep={activeStep}
            sx={{
              flexGrow: 1,
              pt: 0,
              pb: 0,
              px: isSmallScreen ? 0 : 2,
            }}
          >
            {pasos.map((label, index) => (
              <Step key={index}>
                <StepLabel>{!isSmallScreen && label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}

      {/* Step Content */}
      <Box sx={{ minHeight: 250, mb: 4 }}>{renderStep()}</Box>

      {/* Navigation Buttons */}
      {!isTemplateStep && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            flexDirection: isSmallScreen ? "column-reverse" : "row",
            gap: isSmallScreen ? 2 : 0,
          }}
        >
          {/* Back button */}
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            fullWidth={isSmallScreen}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 600,
              borderColor: "#cbd5e1",
              color: "#475569",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#f1f5f9",
                borderColor: "#94a3b8",
              },
              "&.Mui-disabled": {
                borderColor: "#e2e8f0",
                color: "#cbd5e1",
              },
            }}
          >
            Atrás
          </Button>

          {/* Next / Finish button */}
          <Button
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
            variant="contained"
            color="primary"
            fullWidth={isSmallScreen}
            sx={{
              px: 5,
              py: 1.2,
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 4px 10px rgba(59,130,246,0.3)",
              transition: "all 0.25s ease",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(37,99,235,0.4)",
                transform: "translateY(-2px)",
              },
            }}
          >
            {activeStep === pasos.length - 1 ? "Finalizar" : "Siguiente"}
          </Button>
        </Box>
      )}
    </Container>
  );
}
