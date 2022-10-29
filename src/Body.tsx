import React from 'react'
import {Box} from "@mui/material";
import {ProjectComponent} from "./components/ProjectComponent";

export type BodyProps = {}

export const Body: React.FC<BodyProps> = () => {
  return (
    <Box>
      <ProjectComponent />
    </Box>
  )
}