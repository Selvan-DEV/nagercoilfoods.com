"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NextPage } from "next";
import Link from "next/link";

import MenuItem from "@mui/material/MenuItem";
import { useRouter, useSearchParams } from "next/navigation";
import { ClearIcon } from "@mui/x-date-pickers/icons";
import {
  IOrder,
  IOrderStatus,
} from "@/app/(admin)/shop-management/model/ShopManagementModel";
import ChipComponent from "@/components/site-components/chip-component/ChipComponent";
import DateTimeComponent from "@/shared/StandaredDateTime/DateTime";
import AddressFormatter from "@/shared/AddressComponent/AddressComponent";
import {
  getInvoiceBinaries,
  getOrdersByShopId,
} from "@/services/ShopManagement/ShopManagement";
import showErrorToast from "../showErrorToast";

interface IPageProps {
  orders: IOrder[];
  orderStatuses: IOrderStatus[];
  onStatusChange: (payload: { orderId: number; orderStatusId: number }) => void;
  shopId: number;
}

const OrderList: NextPage<IPageProps> = (props) => {
  const { orders, orderStatuses, onStatusChange, shopId } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<{
    [key: number]: HTMLElement | null;
  }>({});
  const open = Boolean(anchorEl);
  const status = searchParams.get("status");
  const [selectedStatusFilterId, setSelectedStatusId] = React.useState<number>(
    Number(status)
  );

  const onStatusFilterChange = (status: string) => {
    const statusId = Number(status);
    setSelectedStatusId(statusId);

    const newSearchParams = new URLSearchParams(searchParams);
    if (statusId) {
      newSearchParams.set("status", String(statusId));
    } else {
      newSearchParams.delete("status");
    }

    // Update the URL with the new query params without reloading the page
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setAnchorEl((prev) => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleClose = (index: number) => {
    setAnchorEl((prev) => ({ ...prev, [index]: null }));
  };

  const handleOnStatusSelect = (
    selectedOrderStatusId: number,
    index: number
  ) => {
    if (!selectedOrderStatusId || index < 0) {
      return;
    }

    const orderId = orders[index].orderId;

    const payload = {
      orderId: orderId,
      orderStatusId: selectedOrderStatusId,
    };

    onStatusChange(payload);
  };

  const handleExport = async () => {
    try {
      const csvBlob = await getOrdersByShopId(shopId, status || "", "Yes");
      const url = window.URL.createObjectURL(csvBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = new Date() + "orders.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download CSV:", err);
    }
  };

  const onDownload = async (orderId: number, index: number) => {
    if (!orderId) {
      return;
    }

    try {
      const pdfBlob = await getInvoiceBinaries(orderId);
      if (pdfBlob) {
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${orderId}.pdf`;
        link.click();
        handleClose(index);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order List
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            width: "50%",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <TextField
              select
              size="small"
              value={selectedStatusFilterId || ""}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              label="Status Filter"
              InputProps={{
                endAdornment: selectedStatusFilterId ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => onStatusFilterChange("")}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              variant="outlined"
              fullWidth
            >
              {orderStatuses.map((option) => (
                <MenuItem
                  key={option.orderStatusId}
                  value={option.orderStatusId}
                >
                  {option.orderStatusName}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* <Button variant="contained" onClick={handleExport}>
            Export
          </Button> */}
        </Box>
      </Box>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table
          sx={{ minWidth: 650, borderCollapse: "collapse" }}
          aria-label="order table"
        >
          <TableHead>
            <TableRow>
              <TableCell>#Order</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Ordered Date</TableCell>
              <TableCell>Delivery Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.orderId}>
                <TableCell>
                  <Link href={`/shop-management/orders/${order.orderId}`}>
                    <Typography color="primary">#{order.orderId}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <ChipComponent value={order.orderStatus || ""} />
                </TableCell>
                <TableCell>
                  <Typography>Rs.{order.orderAmount}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {order.paymentMethodId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <DateTimeComponent dateTime={order.createdAt} />
                </TableCell>
                <TableCell>
                  {order.deliveryAddress && (
                    <AddressFormatter props={order.deliveryAddress} />
                  )}
                </TableCell>

                <TableCell>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, index)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl[index]}
                    open={Boolean(anchorEl[index])}
                    onClose={() => handleClose(index)}
                  >
                    {orderStatuses.map((option) => (
                      <MenuItem
                        key={option.orderStatusId}
                        selected={option.orderStatusName === order.orderStatus}
                        onClick={() =>
                          handleOnStatusSelect(option.orderStatusId, index)
                        }
                      >
                        {option.orderStatusName}
                      </MenuItem>
                    ))}
                    <Divider />
                    <MenuItem onClick={() => onDownload(order.orderId, index)}>
                      Download Invoice
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderList;
