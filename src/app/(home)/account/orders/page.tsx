"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import useUser from "@/customHooks/useUser";
import { getOrdersByUserId } from "@/services/OrderService/OrderService";
import DateTimeComponent from "@/shared/StandaredDateTime/DateTime";

interface Order {
  orderId: number;
  userId: number;
  paymentMethodId: string;
  orderAmount: number;
  orderStatus: string | null;
  createdAt: string;
  updatedAt: string;
  deliveryAddressId: number;
  shippingAddressId: number;
}

export default function OrderTable() {
  const userId = useUser().userId;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const response = await getOrdersByUserId(userId);
          if (response) {
            setOrders(response);
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (orders && orders.length === 0) {
    return (
      <Typography variant="h6" align="center" gutterBottom>
        No orders found.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table
        sx={{
          minWidth: 650,
        }}
        aria-label="orders table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ordered At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders &&
            orders.map((order) => (
              <TableRow
                key={order.orderId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Link href={`/account/orders/${order.orderId}`}>
                    <Typography color="primary">#{order.orderId}</Typography>
                  </Link>
                </TableCell>
                <TableCell>Rs.{order.orderAmount}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>
                  <DateTimeComponent dateTime={order.createdAt} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
