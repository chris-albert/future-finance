import React from 'react'
import {Box} from "@mui/material";
import {PadComponent} from "./PadComponent";
import {Track} from "./model/Project";
import {State} from "./model/State";

export type TrackComponentProps = {
  track: State<Track>
}

export const TrackComponent: React.FC<TrackComponentProps> = ({track}) => {

  return (
    <Box>
      {track.focus('steps').map((step, i) => (
        <PadComponent
          key={`step-${i}`}
          index={i}
          step={step}
        />
      ))}
    </Box>
  )
}