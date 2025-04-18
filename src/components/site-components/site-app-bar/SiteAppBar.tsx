import React, { Suspense } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import SiteNavBar from "../site-nav-bar/SiteNavBar";

const SiteAppBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        border: "none",
        height: "70px",
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Image
            src="/images/logo/logo.jpg"
            alt="Vegist Logo"
            height={55}
            width={55}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" marginRight="16px">
            <IconButton color="primary">
              <PhoneIcon />
            </IconButton>
            <Box>
              <Typography variant="body2">Call now :</Typography>
              <Typography variant="body2">2800 0500 2800</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" marginRight="30px">
            <IconButton color="primary">
              <EmailIcon />
            </IconButton>
            <Box>
              <Typography variant="body2">Email now :</Typography>
              <Typography variant="body2">Info@gmail.com</Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
      <Box sx={{ marginBottom: "30px" }}>
        <Suspense fallback={<div>Loading Nav...</div>}>
          <SiteNavBar />
        </Suspense>
      </Box>
    </AppBar>
  );
};

export default SiteAppBar;
