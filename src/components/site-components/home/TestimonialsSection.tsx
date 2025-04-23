import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import CustomerReviewCard from "../customer-review-card/CustomerReviewCard";

const TestimonialsSection = () => {
  return (
    <Box sx={{ padding: "40px 0", backgroundColor: "#fafafa" }}>
      <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Happy clients love
        </Typography>
        <Box
          sx={{
            width: "40px",
            borderBottom: "2px solid black",
            margin: "10px auto",
          }}
        />
      </Box>
      <Grid container justifyContent="center" spacing={3}>
        <CustomerReviewCard productId={1} refreshReviews={false} />
      </Grid>
    </Box>
  );
};

export default TestimonialsSection;
