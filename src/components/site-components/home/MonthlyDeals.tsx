import { Grid, Card, CardMedia, Container } from "@mui/material";
import React from "react";
import FeaturesSection from "./FeaturesSection";

export default function MakingUpdate() {
  return (
    <Container sx={{ my: 4 }} maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Card>
            <CardMedia
              component="img"
              height="auto"
              image="/images/bg/MakingUpdateBanner.png"
              alt="Deal 1"
            />
          </Card>
        </Grid>
      </Grid>
      <FeaturesSection />
    </Container>
  );
}
