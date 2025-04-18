import React from "react";
import { Container, Typography, Box } from "@mui/material";

function AboutUsContent() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        The Heart Behind the Crunch: Meet Nilas Foods
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to Nilas Foods, where every crunch tells a story of passion and
        dedication. We believe that the perfect chip isn&apos;t just a snack;
        it&apos;s a moment of joy, crafted with care and the finest ingredients.
        Our journey is rooted in a love for flavor and a commitment to quality.
      </Typography>
      <Typography variant="body1" paragraph>
        Nilas Foods began with a simple dream: to create chips that are as
        wholesome as they are delicious. From our kitchen to your hands, we pour
        our heart into every batch, ensuring that each chip delivers an
        unforgettable taste experience.
      </Typography>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph>
          At Nilas Foods, we are committed to providing high quality snacks,
          using sustainable and ethical practices. We value our customers, and
          believe in creating a strong community.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutUsContent;
