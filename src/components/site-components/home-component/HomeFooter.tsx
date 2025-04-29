import React from "react";
import { Grid, Typography, Box, Container, Link } from "@mui/material";

const HomeFooter = () => {
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
            >
              <Link
                href="/product-details/nagercoil-banana-chips"
                variant="body2"
                display="block"
              >
                Nagercoil Nenthiram Chips
              </Link>
              <Link
                href="/product-details/nagercoil-special-mixture"
                variant="body2"
                display="block"
              >
                Nagercoil Special Mixture
              </Link>
              <Link
                href="/product-details/nagercoil-special-seeval"
                variant="body2"
                display="block"
              >
                Nagercoil Seeval
              </Link>
              <Link
                href="/product-details/nagercoil-special-karacho"
                variant="body2"
                display="block"
              >
                Nagercoil Karasev
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick links
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
            >
              <Link href="/" variant="body2" display="block">
                Home
              </Link>
              <Link href="/shop" variant="body2" display="block">
                Shop
              </Link>
              <Link href="/about-us" variant="body2" display="block">
                About Us
              </Link>
              <Link href="/reviews" variant="body2" display="block">
                Reviews
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
            >
              <Link href="/privacy-policy" variant="body2" display="block">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" variant="body2" display="block">
                Terms of Conditions
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact details
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
            >
              <Typography variant="body2">
                Customer care: +91 80725 24935
              </Typography>
              <Typography variant="body2">
                <Link href="mailto:support@nilafoods.com">
                  email - support@nilafoods.com
                </Link>
              </Typography>
              <Typography variant="body2">FSSAI NO: 22425086000072</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            mt={2}
          >
            © {new Date().getFullYear()} Your Digital Firm. All rights reserved.
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeFooter;
