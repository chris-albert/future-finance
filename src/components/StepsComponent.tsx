import React from 'react'
import {Step} from "../model/Project";
import {ArrayState} from "../model/State";
import {Box} from "@mui/material";
import {StepComponent} from "./StepComponent";

export type StepsComponentProps = {
  steps: ArrayState<Step>
}

export const StepsComponent: React.FC<StepsComponentProps> = ({steps}) => {
  return (
    <Box>
      {steps.map((step, i) => (
        <StepComponent
          key={`step-${i}`}
          index={i}
          step={step}
        />
      ))}
    </Box>
  )
}