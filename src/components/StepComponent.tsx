import React from 'react'
import {State} from "../model/State";
import {Step} from "../model/Project";
import {Box, Button} from "@mui/material";

export type StepComponentProps = {
  step: State<Step>
  index: number
}

export const StepComponent: React.FC<StepComponentProps> = ({index, step}) => {
  const state = step.focus('on')

  return (
    <Box component="span" sx={{mx: '2px'}}>
      <Button
        sx={{px: '0'}}
        variant={state.value ? 'contained': 'outlined'}
        onClick={() => {
          state.set(b => !b)
        }}
      >
        {index + 1}
      </Button>
    </Box>
  )
}