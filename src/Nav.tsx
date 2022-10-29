import React from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Button,
  Toolbar,
  createTheme,
  ThemeProvider
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export type NavProps = {

}

export const Nav: React.FC<NavProps> = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  )
}