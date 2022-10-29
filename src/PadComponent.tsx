import React from 'react'
import {Box, Button} from "@mui/material";
import {Project, Step} from "./model/Project";
import {State, useStoreStateObject} from "./model/State";

export type PadComponentProps = {
  step: State<Step>
  index: number
}

export const PadComponent: React.FC<PadComponentProps> = ({index, step}) => {

  const state = useStoreStateObject(step, 'on')

  return (
    <Box component="span" sx={{mx: '2px'}}>
      <Button
        sx={{px: '0'}}
        variant={step.value.on ? 'contained': 'outlined'}
        onClick={() => {
          state.set(b => !b)
        }}
      >
        {index + 1}
      </Button>
    </Box>
  )
}