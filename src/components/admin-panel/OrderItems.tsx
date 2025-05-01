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
import { IOrderDetails } from "@/models/OrderManagement/IAddOrUpdateCartPayload";
import ChipComponent from "../site-components/chip-component/ChipComponent";

interface IPageProps {
  orderDetails: IOrderDetails[];
  orderStatuses: IOrderStatus[];
  onStatusChange: (payload: { orderId: number; orderStatusId: number }) => void;
}

const OrderItems: NextPage<IPageProps> = (props) => {
  const { orderDetails, orderStatuses, onStatusChange } = props;

  const handleOnStatusSelect = (selectedOrderStatusId: number) => {
    if (!selectedOrderStatusId) {
      return;
    }

    const payload = {
      orderId: orderDetails[0].orderId || 0,
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
              Order # {orderDetails[0]?.orderId.toString()} - Products Details
            </Typography>
            <Box>
              <ChipComponent value={orderDetails[0].paymentStatus || ""} />
            </Box>
          </Box>

          <ButtonMenuComponent
            options={orderStatuses.map((x) => ({
              value: x.orderStatusId,
              key: x.orderStatusName,
            }))}
            buttonName={orderDetails[0]?.orderStatusName || ""}
            onSelect={handleOnStatusSelect}
          />
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Item Price</TableCell>
              <TableCell>Offer Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails &&
              orderDetails.length > 0 &&
              orderDetails.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={item.imageUrl}
                        alt={item.productName}
                        sx={{ width: 60, height: 60, marginRight: 2 }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {item.productName}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {item.variantName
                      ? item.variantName
                      : item.weight.split(".")[0] + "g"}
                  </TableCell>
                  <TableCell>Rs.{item.productPrice}</TableCell>
                  <TableCell>Rs.{item.offerPrice}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>Rs.{item.price}</TableCell>
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
              <Typography variant="body1">Discount:</Typography>
              <Typography variant="body1" sx={{ color: "red" }}>
                -Rs.{orderDetails[0].discountValue}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography variant="body1">Delivery Charge:</Typography>
              <Typography variant="body1">
                Rs.{orderDetails[0].deliveryCharge}
              </Typography>
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
                Rs.{orderDetails[0]?.finalAmount}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderItems;
