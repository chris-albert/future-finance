import React from 'react';
import './styles.scss'
import {Nav} from "./Nav";
import {Body} from "./Body";
import {createTheme, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Nav />
        <Body />
      </ThemeProvider>
    </div>
  );
}

export default App;
