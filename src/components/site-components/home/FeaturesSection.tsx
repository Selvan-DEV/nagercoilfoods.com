import React from "react";
import { Box, Typography, Grid, styled } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const FeatureBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
`;

const FeatureIcon = styled(Box)`
  color: var(--primary-color);
  margin-bottom: 8px;
`;

const FeatureTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 4px;
`;

const FeatureDescription = styled(Typography)`
  font-size: 0.875rem;
`;

const FeaturesSection = () => {
  return (
    <Box sx={{ padding: "24px 0" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <FeatureBox>
            <FeatureIcon>
              <LocalShippingOutlinedIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle variant="subtitle1">Free delivery</FeatureTitle>
            <FeatureDescription variant="body2">
              Orders from all item
            </FeatureDescription>
          </FeatureBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureBox>
            <FeatureIcon>
              <RestoreOutlinedIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle variant="subtitle1">Return & refund</FeatureTitle>
            <FeatureDescription variant="body2">
              Money back guarantee
            </FeatureDescription>
          </FeatureBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureBox>
            <FeatureIcon>
              <HeadsetMicOutlinedIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle variant="subtitle1">Customer support</FeatureTitle>
            <FeatureDescription variant="body2">
              Alway online live 24/7
            </FeatureDescription>
          </FeatureBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureBox>
            <FeatureIcon>
              <EmailOutlinedIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle variant="subtitle1">Join newsletter</FeatureTitle>
            <FeatureDescription variant="body2">
              20% off by subscribing
            </FeatureDescription>
          </FeatureBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
