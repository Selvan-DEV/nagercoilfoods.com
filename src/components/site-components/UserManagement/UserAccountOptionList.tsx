import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactsIcon from "@mui/icons-material/Contacts";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Link from "next/link";

export const mainListItems = (
  <React.Fragment>
    <Link href={"/account/orders"} prefetch>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </Link>
    <ListSubheader component="div" inset>
      Account Settings
    </ListSubheader>
    <Link href={"/account/address"} prefetch>
      <ListItemButton>
        <ListItemIcon>
          <ContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Address" />
      </ListItemButton>
    </Link>
    <Link href={"/account/profile-info"} prefetch>
      <ListItemButton>
        <ListItemIcon>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Profile Information" />
      </ListItemButton>
    </Link>
    {/* <Divider sx={{ my: 1 }} />
    <ListSubheader component="div" inset>
      Payments
    </ListSubheader>
    <Link href={"/account/account-card-information"} prefetch>
      <ListItemButton>
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText primary="Cards Informations" />
      </ListItemButton>
    </Link>
    <Divider sx={{ my: 1 }} /> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
