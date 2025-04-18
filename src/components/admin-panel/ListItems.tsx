"use client";

import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { usePathname, useRouter } from "next/navigation";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RedeemIcon from "@mui/icons-material/Redeem";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Divider } from "@mui/material";

const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    href: "/shop-management/dashboard",
  },
];

const productNavItems = [
  {
    text: "Products",
    icon: <AssignmentIcon />,
    href: "/shop-management/products",
  },
  {
    text: "Customer Reviews",
    icon: <ReviewsIcon />,
    href: "/shop-management/products/reviews",
  },
];

const orderNavItems = [
  {
    text: "New Orders",
    icon: <AddShoppingCartIcon />,
    href: "/shop-management/orders/new-orders",
  },
  {
    text: "All Orders",
    icon: <ShoppingCartIcon />,
    href: "/shop-management/orders",
  },
];

const customerNavItems = [
  {
    text: "Customers",
    icon: <PeopleIcon />,
    href: "/shop-management/customers",
  },
];

const offersAndCouponsNavItems = [
  {
    text: "Coupons",
    icon: <RedeemIcon />,
    href: "/shop-management/coupons",
  },
];

export const MainListItems = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <>
      {navItems.map((item) => (
        <ListItemButton
          selected={pathName === item.href}
          key={item.text}
          onClick={() => router.push(item.href)}
          sx={{ borderRadius: "5px" }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </>
  );
};

export const SecondaryListItems = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <>
      <ListSubheader component="div">Product Management</ListSubheader>
      {productNavItems.map((item) => (
        <ListItemButton
          component="a"
          selected={pathName === item.href}
          key={item.text}
          onClick={() => router.push(item.href)}
          sx={{ borderRadius: "5px" }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div">Order Management</ListSubheader>
      {orderNavItems.map((item) => (
        <ListItemButton
          component="a"
          selected={pathName === item.href}
          key={item.text}
          onClick={() => router.push(item.href)}
          sx={{ borderRadius: "5px" }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div">Customer Management</ListSubheader>
      {customerNavItems.map((item) => (
        <ListItemButton
          component="a"
          selected={pathName === item.href}
          key={item.text}
          onClick={() => router.push(item.href)}
          sx={{ borderRadius: "5px" }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div">Offers & Coupons Management</ListSubheader>
      {offersAndCouponsNavItems.map((item) => (
        <ListItemButton
          component="a"
          selected={pathName === item.href}
          key={item.text}
          onClick={() => router.push(item.href)}
          sx={{ borderRadius: "5px" }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </>
  );
};
