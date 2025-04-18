"use client";

import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { useParams } from "next/navigation";
import { getOrderByOrderId } from "@/services/OrderService/OrderService";

interface Product {
  id: number;
  productName: string;
  description: string;
  price: string;
  rating: string;
  brand: string;
  uniqueName: string;
  imageUrl: string;
  productQuantity: number;
  createdAt: string;
}

interface OrderItem {
  orderItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
  product: Product;
}

const OrderDetails = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ orderId: string }>();

  useEffect(() => {
    if (params.orderId) {
      const fetchOrderDetails = async () => {
        try {
          const response = await getOrderByOrderId(Number(params.orderId));
          setOrderItems(response);
        } catch (error) {
          console.error("Error fetching order details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetails();
    }
  }, [params.orderId]);

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

  return (
    <Paper elevation={0} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order Details
      </Typography>
      <List>
        {orderItems &&
          orderItems.map((item) => (
            <ListItem key={item.orderItemId}>
              <ListItemAvatar>
                <Avatar
                  src={item.product.imageUrl}
                  alt={item.product.productName}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.product.productName}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.product.description}
                    </Typography>
                    <br />
                    Quantity: {item.quantity} | Price: ${item.price}
                  </>
                }
              />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};

export default OrderDetails;
