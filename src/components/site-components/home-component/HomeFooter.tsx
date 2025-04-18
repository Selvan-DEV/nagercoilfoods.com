import React from "react";
import { Grid, Typography, Box, Container, Link } from "@mui/material";

const HomeFooter = () => {
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Most Selling Products
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
            >
              <Link href="#" variant="body2" display="block">
                Spicy Banana Chips
              </Link>
              <Link href="#" variant="body2" display="block">
                Sweet Banana Chips
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
              <Link href="#" variant="body2" display="block">
                Track Your Order
              </Link>
              <Link href="#" variant="body2" display="block">
                About NGL Foods
              </Link>
              <Link href="#" variant="body2" display="block">
                Our Team
              </Link>
              <Link href="#" variant="body2" display="block">
                Contact us
              </Link>
              <Link href="#" variant="body2" display="block">
                Banana Chips
              </Link>
              <Link href="#" variant="body2" display="block">
                All Products
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
              <Link href="#" variant="body2" display="block">
                Track my order
              </Link>
              <Link href="#" variant="body2" display="block">
                Refund Policy
              </Link>
              <Link href="#" variant="body2" display="block">
                Privacy Policy
              </Link>
              <Link href="#" variant="body2" display="block">
                Terms of Service
              </Link>
              <Link href="#" variant="body2" display="block">
                Shipping Policy
              </Link>
              <Link href="#" variant="body2" display="block">
                Blog
              </Link>
              <Link href="#" variant="body2" display="block">
                FAQs
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
                Customer care: 1111 00 1111
              </Typography>
              <Typography variant="body2">
                Other enquiries: 1111 11 1111
              </Typography>
              <Typography variant="body2">
                <Link href="mailto:nglfoods@gmail.com">
                  email - nglfoods@gmail.com
                </Link>
              </Typography>
              <Typography variant="body2">FSSAI NO: 1111111111111</Typography>
              <Typography variant="body2">
                Address - RFGT House Abc, No 34, CFG Nagar, RF Jn, Nagercoil
                629601
              </Typography>
              <Typography variant="body2">
                <Link href="#">Customer Reviews ⭐ (1000+)</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeFooter;
