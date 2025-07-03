import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

export default function Timeline({ activeStep, steps }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}