"use client";

import * as React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ProtectedRoute from "@/app/protectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminTheme from "@/theme/AdminTheme";

import { Outfit } from "next/font/google";
import GlobalLoader from "@/components/shared/GlobalLoader";
import { Suspense } from "react";
import AppbarComponent from "@/components/admin-panel/app-bar/AppbarComponent";
import {
  MainListItems,
  SecondaryListItems,
} from "@/components/admin-panel/ListItems";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const drawerWidth: number = 240;

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

export default function ShopDashboardComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <title>Admin Panel</title>
      </head>
      <body className={outfit.className}>
        <ThemeProvider theme={adminTheme}>
          <CssBaseline />
          <ProtectedRoute isAdmin={{ isAdmin: true }}>
            <Box sx={{ display: "flex" }}>
              <AppbarComponent />
              <Drawer variant="permanent" open={open}>
                <Toolbar
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                  }}
                >
                  <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                  </IconButton>
                </Toolbar>

                <List component="nav" sx={{ padding: "10px" }}>
                  <MainListItems />
                  <Divider sx={{ my: 1 }} />
                  <SecondaryListItems />
                </List>
              </Drawer>
              <Box
                component="main"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  height: "100vh",
                  overflow: "auto",
                }}
              >
                <GlobalLoader />
                <Toolbar />
                <Suspense fallback={<span>..loading</span>}>
                  {children}
                </Suspense>
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
          </ProtectedRoute>
        </ThemeProvider>
      </body>
    </html>
  );
}
