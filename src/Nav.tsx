import React from 'react'
import {
  AppBar,
  Box,
  Toolbar, Grid,
} from "@mui/material";
import {TransportComponent} from "./components/TransportComponent";

export type NavProps = {

}

export const Nav: React.FC<NavProps> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Grid container >
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={4} container justifyContent="center">
              <TransportComponent />
            </Grid>
            <Grid item xs={4} container justifyContent="right">

            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
    </Box>
  )
}