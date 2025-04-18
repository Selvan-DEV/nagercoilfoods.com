"use client";

import React from "react";
import { useGlobalLoaderStore } from "@/store/shared-store/useGlobalLoaderStore";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

const GlobalLoader = () => {
  const loading = useGlobalLoaderStore((state) => state.loading);

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(255,255,255,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress color="primary" />
        <Typography mt={2} fontWeight="medium">
          Please wait...
        </Typography>
      </Box>
    </Box>
  );
};

export default GlobalLoader;
