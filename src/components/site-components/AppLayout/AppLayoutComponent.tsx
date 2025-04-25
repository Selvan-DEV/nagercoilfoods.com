"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import SiteAppBar from "@/components/site-components/site-app-bar/SiteAppBar";
import HomeFooter from "../home-component/HomeFooter";

export default function AppLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  // Custom theme to apply the colors you shared
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#f1e3d3",
      },
    },
    typography: {
      fontFamily: "var(--font-outfit), sans-serif",
    },
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            border: "1px solid #e5e7eb",
          },
        },
      },
    },
  });

  const pathName = usePathname();
  const hideTopAppBar = pathName.includes("/account");

  return (
    <>
      {!hideTopAppBar && (
        <ThemeProvider theme={theme}>
          <SiteAppBar />
        </ThemeProvider>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          marginTop: "130px",
          paddingBottom: "30px",
        }}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Box>

      {/* Home Page Footer */}
      <ThemeProvider theme={theme}>
        <HomeFooter />
      </ThemeProvider>
    </>
  );
}
