"use client";

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useGlobalLoaderStore } from "@/store/shared-store/useGlobalLoaderStore";
import { IUserData } from "@/models/UserManagement/IUserData";
import {
  getShopAdminData,
  setItemToSessionStorage,
} from "@/shared/SharedService/StorageService";

const AppbarComponent = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [adminUser, setAdminData] = useState<IUserData | null>(null);
  const { showLoader, hideLoader } = useGlobalLoaderStore.getState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showLoader();
    const data = getShopAdminData();
    if (data) {
      setAdminData(data);
      hideLoader();
      setLoading(false);
    } else {
      hideLoader();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action: string) => {
    switch (action) {
      case "logout":
        onLogout();
        break;

      default:
        break;
    }
    setAnchorEl(null);
  };

  const onLogout = (): void => {
    setItemToSessionStorage("adminData", null);
    router.push("/shop-dashboard-login");
  };

  if (loading || !adminUser) {
    return;
  }

  return (
    <AppBar
      position="absolute"
      sx={{ borderRadius: 0, backgroundColor: "#FFFF", color: "green" }}
    >
      <Toolbar
        sx={{
          pr: "24px",
          justifyContent: "flex-end",
        }}
      >
        <Button
          aria-label="account of current user"
          aria-controls="menu-appbar"
          onClick={handleClick}
          color="inherit"
        >
          <Typography variant="body2">{adminUser.firstName}</Typography>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppbarComponent;
