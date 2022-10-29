import React from 'react'
import {emptyProject} from "../model/Project";
import {Box} from "@mui/material";
import {TrackComponent} from "../TrackComponent";
import {
  useStoreRepository,
  useStoreState,
} from "../model/State";

export type ProjectComponentProps = {}

export const ProjectComponent: React.FC<ProjectComponentProps> = () => {

  const projectRepo = useStoreRepository('project', emptyProject())
  const projectState = useStoreState(projectRepo)

  return (
    <Box>
      {projectState.focus('tracks').map((track, i) => (
        <TrackComponent
          key={`track-${i}`}
          track={track}
        />
      ))}
    </Box>
  )
}