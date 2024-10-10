import React from 'react'
import {Box} from "@mui/material";
import {Nav} from "../Nav";
import { Outlet } from "react-router-dom";

export type RootPageProps = {}

export const RootPage: React.FC<RootPageProps> = () => {

  return (
    <Box>
      <Nav />
      <Box sx={{p: 2}}>
        <Outlet />
      </Box>
    </Box>
  )
}