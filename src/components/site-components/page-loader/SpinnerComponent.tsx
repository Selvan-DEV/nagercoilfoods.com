import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

export default function SpinnerComponent() {
  return (
    <Paper sx={{ minHeight: "100vh", border: "none", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    </Paper>
  );
}
