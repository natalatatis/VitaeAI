import React, { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel, Container, IconButton, useTheme, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2About from "./Step2About";
import Step3Exp from "./Step3Exp";
import Step4Educacion from "./Step4Educacion";
import Step5Skills from "./Step5Skills";

const pasos = ["Información Personal", "Acerca de", "Experiencia", "Educación", "Habilidades"];

export default function Wizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    acercaDe: "",
    experiencia: [{ descripcion: "" }],
    educacion: [{ descripcion: "" }],
    habilidades: [""],
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); 

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleLanding = () => navigate("/");

  const renderStep = () => {
    switch (activeStep) {
      case 0: return <Step1PersonalInfo formData={formData} setFormData={setFormData} />;
      case 1: return <Step2About formData={formData} setFormData={setFormData} />;
      case 2: return <Step3Exp formData={formData} setFormData={setFormData} />;
      case 3: return <Step4Educacion formData={formData} setFormData={setFormData} />;
      case 4: return <Step5Skills formData={formData} setFormData={setFormData} />;
      default: return <div>¡Fin del wizard!</div>;
    }
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: 3, 
        px: isSmallScreen ? 2 : 0, 
        position: "relative" 
      }}
    >
      
      {/* HEADER ROW: Container for the Back Button and Stepper */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3, 
        width: '100%', 
      }}>
        

        <IconButton 
          onClick={handleLanding} 
          color="primary"

          sx={{ mr: 2, p: 1 }} 
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

      {/* Step content (The Card) */}
      <Box 

        sx={{ minHeight: 250, mb: 3 }}
      >
        {renderStep()}
      </Box>

      <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          mt: 0, 
          flexDirection: isSmallScreen ? 'column-reverse' : 'row',
          gap: isSmallScreen ? 2 : 0,
      }}>
        <Button 
          disabled={activeStep === 0} 
          onClick={handleBack} 
          variant="outlined"
          fullWidth={isSmallScreen}
        >
          Atrás
        </Button>
        <Button 
          onClick={handleNext} 
          variant="contained" 
          color="primary"
          fullWidth={isSmallScreen}
        >
          {activeStep === pasos.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </Box>
    </Container>
  );
}