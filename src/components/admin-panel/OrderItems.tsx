import {
  Box,
  Paper,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import React from "react";
import { NextPage } from "next";
import {
  IOrderItemsSummary,
  IOrderStatus,
} from "@/app/(admin)/shop-management/model/ShopManagementModel";
import ButtonMenuComponent from "@/shared/ButtonMenuComponent/ButtonMenu";

interface IPageProps {
  order: IOrderItemsSummary | null;
  orderStatuses: IOrderStatus[];
  onStatusChange: (payload: { orderId: number; orderStatusId: number }) => void;
}

const OrderItems: NextPage<IPageProps> = (props) => {
  const { order, orderStatuses, onStatusChange } = props;

  const handleOnStatusSelect = (selectedOrderStatusId: number) => {
    if (!selectedOrderStatusId) {
      return;
    }

    const payload = {
      orderId: order?.orderId || 0,
      orderStatusId: selectedOrderStatusId,
    };

    onStatusChange(payload);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">
              Order # {order?.orderId.toString()} - Products Details
            </Typography>
            <Typography variant="body2">Fully Paid</Typography>
          </Box>

          <ButtonMenuComponent
            options={orderStatuses.map((x) => ({
              value: x.orderStatusId,
              key: x.orderStatusName,
            }))}
            buttonName={order?.orderStatus || ""}
            onSelect={handleOnStatusSelect}
          />
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Product Table Section */}
        {/* <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Product Details
      </Typography> */}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Item Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order &&
              order.orderItems &&
              order.orderItems.length > 0 &&
              order.orderItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={item.product.imageUrl}
                        alt={item.product.productName}
                        sx={{ width: 60, height: 60, marginRight: 2 }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {item.product.productName}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>${item.product.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>Rs.{item.product.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Summary Section */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Box sx={{ width: "50%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography variant="body1">Sub Total:</Typography>
              <Typography variant="body1">
                Rs.{order?.totalAmount?.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography variant="body1">Discount (VELZON15):</Typography>
              <Typography variant="body1" sx={{ color: "red" }}>
                Rs.00
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography variant="body1">Shipping Charge:</Typography>
              <Typography variant="body1">Rs.00</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography variant="body1">Estimated Tax:</Typography>
              <Typography variant="body1">Rs.00</Typography>
            </Box>
            <Divider sx={{ marginY: 1 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <Typography variant="body1">Total (INR):</Typography>
              <Typography variant="body1">
                Rs.{order?.totalAmount?.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderItems;
