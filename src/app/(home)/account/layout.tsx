"use client";

import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { List, useMediaQuery } from "@mui/material";
import ProtectedRoute from "../../protectedRoute";
import { ToastContainer } from "react-toastify";
import SiteAppBar from "@/components/site-components/site-app-bar/SiteAppBar";
import { mainListItems } from "@/components/site-components/UserManagement/UserAccountOptionList";

const drawerWidth: number = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: "#BF8C09",
    },
    secondary: {
      main: "#fff", // White for text
    },
  },
  typography: {
    fontFamily: "var(--font-outfit), sans-serif",
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function UserAccountManagementPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <SiteAppBar />
      </ThemeProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={!isMobile}
          sx={{
            height: "100vh",
          }}
        >
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <ProtectedRoute>{children}</ProtectedRoute>
          </Box>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
          />
        </Box>
      </Box>
    </Box>
  );
}
