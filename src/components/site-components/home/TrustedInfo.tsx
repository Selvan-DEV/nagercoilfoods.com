import React from "react";
import { Box, Typography } from "@mui/material";

const TrustedInfo = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "400px",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }} color="primary">
        Trusted by 10,000+ households
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "10px" }} color="primary">
        4.8/5 in Google reviews (1000+ reviews)
      </Typography>
    </Box>
  );
};

export default TrustedInfo;
