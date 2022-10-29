import React from 'react'
import {Box, Button} from "@mui/material";
import {Track} from "../model/Project";
import {State} from "../model/State";
import {StepsComponent} from "./StepsComponent";

export type TrackComponentProps = {
  track: State<Track>
}

export const TrackComponent: React.FC<TrackComponentProps> = ({track}) => {

  return (
    <Box sx={{mb: '4px'}}>
      {/*<Button variant="text">*/}
      {/*  {track.value.name}*/}
      {/*</Button>*/}
      <StepsComponent steps={track.focus('steps')} />
    </Box>
  )
}