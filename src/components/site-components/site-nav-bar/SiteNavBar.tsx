"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  styled,
  Badge,
  ListItemIcon,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname, useRouter } from "next/navigation";
import { Settings, Logout } from "@mui/icons-material";
import { useCartStore } from "@/store/site-store/useCartStore";
import { useUserStore } from "@/store/site-store/useUserStore";
import useUser from "@/customHooks/useUser";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";

const StyledNavButton = styled(Button)`
  color: black;
  text-transform: uppercase;
  font-weight: bold;
  padding: 8px 12px;
  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
`;

const pages = [
  { page: "Home", url: "/" },
  { page: "Shop", url: "/shop" },
  { page: "About Us", url: "/about-us" },
  { page: "Contact", url: "/contact" },
  { page: "Reviews", url: "/reviews" },
];

const SiteNavBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const user = useUser();
  const sessionId = getSessionStorageItem("sessionId") as string;
  const fetchCart = useCartStore((state) => state.fetchCart);
  const logout = useUserStore((state) => state.logout);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const itemCount = useCartStore(
    (state) => state.cartItems?.cartItems?.length ?? 0
  );

  useEffect(() => {
    if ((user && user.userId) || sessionId) {
      const userId = user.userId as number;
      fetchCart(userId || sessionId);
    }
  }, [fetchCart, sessionId, user]);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onNavigateToCheckoutPage = () => {
    router.push("/checkout");
    // if (user.userId) {
    //   router.push("/checkout");
    // } else {
    //   openLoginModal();
    // }
  };

  // const openLoginModal = () => {
  //   setOpenSignInModal(true);
  // };

  const onNavigate = (route: string): void => {
    handleMenuClose();
    router.push(route);
  };

  const onLogout = (): void => {
    logout();
    handleMenuClose();
    router.push("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => onNavigate("/account/orders")}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        My account
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "8px 45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isMobile ? (
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Box display="flex" alignItems="center">
            {pages.map((page) => (
              <StyledNavButton
                key={page.page}
                onClick={() => router.push(page.url)}
                sx={{
                  textDecoration: pathName === page.url ? "underline" : "",
                  textDecorationColor: "var(--primary-color)",
                  textDecorationThickness: "3px",
                }}
              >
                {page.page}
              </StyledNavButton>
            ))}
          </Box>
        )}

        <Box display="flex" alignItems="center">
          <IconButton
            color={user?.userId ? "primary" : "default"}
            onClick={(e) =>
              !user?.userId ? router.push("/sign-in") : handleProfileMenuOpen(e)
            }
          >
            <PersonOutlineIcon />
          </IconButton>
          <IconButton>
            <Badge
              badgeContent={`${itemCount}`}
              color="primary"
              onClick={onNavigateToCheckoutPage}
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Box>

      {renderMenu}

      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {pages.map(({ page, url }) => (
              <ListItem key={page} onClick={() => router.push(url)}>
                <ListItemText primary={page} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SiteNavBar;
