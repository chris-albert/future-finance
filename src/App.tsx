import React from 'react';
import './styles.scss'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {RootPage} from "./pages/RootPage";
import {DataPage} from "./pages/DataPage";
import {GroupsPage} from "./pages/GroupsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <GroupsPage />,
      },
      {
        path: "/data",
        element: <DataPage />,
      },
    ]
  },

]);


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
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
    </div>
  );
}

export default App;
