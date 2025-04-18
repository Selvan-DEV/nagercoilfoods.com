import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Grid,
  Paper,
} from "@mui/material";

const reviews = [
  {
    name: "Uma Devi",
    rating: 5,
    comment:
      "As an absolute lover of kerala! Trust me I've ate in several places all these years! But am Absolutely in love with this chips already! my peeps went on spree,that they finished it all within few minutes of opening the packet.",
  },
  {
    name: "John Stephen",
    rating: 4,
    comment:
      "I have ordered few items from enchips website and got it within 2 days with fastest delivery to Bangalore. All the items are tasty and good in package too. Thank you.",
  },
  {
    name: "Siva",
    rating: 5,
    comment:
      "Banana chips was super tasty. It was crispy, and had the right amount of saltiness in it. And the upperi was delicious as well! Will definitely purchase again.",
  },
];

const ReviewsCards = () => {
  return (
    <Paper sx={{ padding: 2, marginTop: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Recent Reviews
      </Typography>
      <Grid container spacing={3}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                height: "100%",
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {review.name}
                </Typography>
                <Box display="flex" alignItems="center" marginBottom={1}>
                  <Rating
                    name="read-only"
                    value={review.rating}
                    readOnly
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ReviewsCards;
