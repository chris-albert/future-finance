import React from 'react'
import {emptyProject, steps} from "../model/Project";
import {Box, Divider, Paper} from "@mui/material";
import {TrackComponent} from "./TrackComponent";
import {
  useStoreState
} from "../model/State";
import {useStateRepository, useStoreRepository} from "../model/Repository";
import {StepsComponent} from "./StepsComponent";

export type ProjectComponentProps = {}

export const ProjectComponent: React.FC<ProjectComponentProps> = () => {

  const projectRepo = useStoreRepository('project', emptyProject())
  const projectState = useStoreState(projectRepo)

  const stepTrackerRepo = useStateRepository(steps(8))
  const stepTrackerState = useStoreState(stepTrackerRepo)

  return (
    <Box>
      <Paper sx={{p: 2}}>
        {projectState.focus('tracks').map((track, i) => (
          <TrackComponent
            key={`track-${i}`}
            track={track}
          />
        ))}
        <Divider />
        <StepsComponent steps={stepTrackerState.focus('steps')} />
      </Paper>
    </Box>
  )
}