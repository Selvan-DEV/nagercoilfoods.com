import React from "react";
import { Container, Typography, Box } from "@mui/material";

function AboutUsContent() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        The Heart Behind the Crunch: Meet Nilas Foods
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to Nila Chips, your go-to destination for delicious, crispy, and
        wholesome banana chips!
      </Typography>
      <Typography variant="body1" paragraph>
        We started as a small family has now grown into a beloved snack brand
        that brings the authentic taste of traditional banana chips to your
        doorstep. At Nila Chips, we believe in keeping things simple, natural,
        and flavorful. That’s why we use only carefully selected bananas, sliced
        to perfection and fried in premium-quality oil, with just the right
        touch of seasoning.
      </Typography>

      <Box mt={4}>
        <Typography variant="body1" paragraph>
          Our mission is to bring you a snack that’s not only irresistibly
          crunchy but also made with honesty and heart. Whether you’re craving a
          savory bite or looking for a healthier alternative to processed
          snacks, our banana chips are crafted to satisfy every palate. We’re
          proud to blend tradition with quality, ensuring every chip you munch
          on is packed with freshness, crunch, and goodness.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Thank you for being a part of our journey. Here’s to guilt-free
          snacking with a whole lot of crunch!
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutUsContent;
