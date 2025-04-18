import React from "react";
import { Box, Typography, Grid, Card, styled } from "@mui/material";
import CustomerReviewCard, {
  ReviewProps,
} from "../customer-review-card/CustomerReviewCard";

const reviews: any[] = [
  {
    rating: 5,
    title: "Crispy & Delicious",
    content:
      "These banana chips are perfectly crispy and lightly salted. Great for snacking anytime!",
    user: "Regular Customer",
    location: "Morshi",
    timeAgo: "5 months ago",
    upvotes: 8,
    downvotes: 0,
  },
  {
    rating: 5,
    title: "Tasty but slightly oily",
    content:
      "I love the natural banana flavor and the crunch. Just felt a bit greasy, but still very enjoyable.",
    user: "Winny Mathew Kurian",
    location: "Bengaluru",
    timeAgo: "6 months ago",
    upvotes: 9,
    downvotes: 2,
  },
];
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
        {reviews.map((review, index) => (
          <Grid item key={index}>
            <CustomerReviewCard {...review} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialsSection;
