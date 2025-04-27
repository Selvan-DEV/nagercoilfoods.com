import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import SiteNavBar from "../site-nav-bar/SiteNavBar";
import Link from "next/link";

const SiteAppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "var(--primary-color)",
        color: "black",
        boxShadow: "none",
        border: "none",
        height: "100px",
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Link href="/">
            <Image
              src="/images/logo/logo.png"
              alt="Vegist Logo"
              height={100}
              width={100}
            />
          </Link>
        </Box>
        <SiteNavBar />
        <Box
          display="flex"
          alignItems="center"
          sx={{ color: "var(--app-bar-text-color)" }}
        >
          {!isMobile && (
            <>
              <Box display="flex" alignItems="center" marginRight="16px">
                <IconButton sx={{ color: "var(--app-bar-text-color)" }}>
                  <PhoneIcon />
                </IconButton>
                <Box>
                  <Typography variant="body2">Call now :</Typography>
                  <Typography variant="body2">+91 80725 24935</Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" marginRight="30px">
                <IconButton sx={{ color: "var(--app-bar-text-color)" }}>
                  <EmailIcon />
                </IconButton>
                <Box>
                  <Typography variant="body2">Email now :</Typography>
                  <Typography variant="body2">support@nilafoods.com</Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SiteAppBar;
