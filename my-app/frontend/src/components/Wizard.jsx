// src/components/Wizard/Wizard.jsx
import React, { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel, Container } from "@mui/material";
import Step1PersonalInfo from "./Step1PersonalInfo";
// Later you can create Step2Acerca, Step3Experiencia, Step4Educacion, Step5Habilidades

const pasos = ["Información Personal", "Acerca de", "Experiencia", "Educación", "Habilidades"];

export default function Wizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    acercaDe: "",
    experiencia: [{ empresa: "", puesto: "", duracion: "" }],
    educacion: [{ institucion: "", titulo: "", year: "" }],
    habilidades: [""],
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1PersonalInfo formData={formData} setFormData={setFormData} />;
      // case 1: return <Step2Acerca formData={formData} setFormData={setFormData} />;
      // case 2: return <Step3Experiencia formData={formData} setFormData={setFormData} />;
      // case 3: return <Step4Educacion formData={formData} setFormData={setFormData} />;
      // case 4: return <Step5Habilidades formData={formData} setFormData={setFormData} />;
      default:
        return <div>¡Fin del wizard!</div>;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {pasos.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step content */}
      <Box sx={{ minHeight: 300 }}>{renderStep()}</Box>

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Atrás
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          {activeStep === pasos.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </Box>
    </Container>
  );
}
