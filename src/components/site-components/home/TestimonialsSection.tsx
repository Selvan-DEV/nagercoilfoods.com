import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import CustomerReviewCard from "../customer-review-card/CustomerReviewCard";
import CustomButton from "../custom-button/CustomButton";
import { useRouter } from "next/navigation";

const TestimonialsSection = () => {
  const router = useRouter();

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
        <CustomerReviewCard productId={6} refreshReviews={false} />
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CustomButton
          onClick={() => router.push("/reviews")}
          name="All Reviews"
        />
      </Box>
    </Box>
  );
};

export default TestimonialsSection;
