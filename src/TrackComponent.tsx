import React from 'react'
import {Box} from "@mui/material";
import {PadComponent} from "./PadComponent";
import {Track} from "./model/Project";
import {emptyStoreStateArrayOps, State, useStoreStateArray, useStoreStateObject} from "./model/State";

export type TrackComponentProps = {
  track: State<Track>
}

export const TrackComponent: React.FC<TrackComponentProps> = ({track}) => {

  const stepState = useStoreStateArray(
    useStoreStateObject(track, 'steps'),
    emptyStoreStateArrayOps()
  )

  return (
    <Box>
      {stepState.values.map((step, i) => (
        <PadComponent index={i} step={stepState.focus(i)} />
      ))}
    </Box>
  )
}