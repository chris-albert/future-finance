import React from 'react'
import {Box, Button} from "@mui/material";
import {Step} from "./model/Project";
import {State} from "./model/State";

export type PadComponentProps = {
  step: State<Step>
  index: number
}

export const PadComponent: React.FC<PadComponentProps> = ({index, step}) => {

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