import React from 'react'
import {emptyProject, useProject, Project} from "../model/Project";
import {Box} from "@mui/material";
import {TrackComponent} from "../TrackComponent";
import {
  emptyStoreStateArrayOps,
  useStoreRepository,
  useStoreState,
  useStoreStateArray,
  useStoreStateObject
} from "../model/State";

export type ProjectComponentProps = {}

export const ProjectComponent: React.FC<ProjectComponentProps> = () => {

  const projectRepo = useStoreRepository('project', emptyProject)
  const projectState = useStoreState(projectRepo)
  const tracksState = useStoreStateArray(
    useStoreStateObject(projectState, 'tracks'),
    emptyStoreStateArrayOps()
  )

  return (
    <Box>
      {tracksState.values.map((track, i) => (
        <TrackComponent track={tracksState.focus(i)} />
      ))}
    </Box>
  )
}