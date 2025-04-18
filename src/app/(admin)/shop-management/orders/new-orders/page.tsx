"use client";

import RecentOrders from "@/components/admin-panel/recent-orders/RecentOrders";
import { getRecentOrdersList } from "@/services/ShopManagement/ShopDashboard";
import { Box, CircularProgress, Paper } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { IRecentOrders } from "../../model/ShopManagementModel";
import { io } from "socket.io-client";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { ILoginResponse } from "@/models/UserManagement/IUserData";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function NewOrdersPage() {
  const shopData = getSessionStorageItem("adminData") as ILoginResponse;

  const [loading, setLoading] = useState<boolean>(false);
  const [recentOrders, setRecentOrders] = useState<IRecentOrders[]>([]);
  const [shopId, setShopId] = useState<number>(0);

  useEffect(() => {
    if (shopData && shopData.user && shopData.user.shopId) {
      setShopId(shopData.user.shopId);
    }
  }, [shopData, shopId]);

  useEffect(() => {
    socket.on("orderUpdate", () => {
      getRecentOrders();
    });

    return () => {
      socket.off("orderUpdate");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRecentOrders = useCallback(async () => {
    if (!shopId) return;
    try {
      setLoading(true);
      const recentOrders = await getRecentOrdersList(shopId);
      setLoading(false);
      if (recentOrders) {
        setRecentOrders(recentOrders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    getRecentOrders();
  }, [getRecentOrders]);

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Paper sx={{ minHeight: "100vh", border: "none", padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              minHeight: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        </Paper>
      ) : (
        <RecentOrders
          recentOrders={recentOrders}
          pageTitle="New Orders"
          shopId={shopId}
        />
      )}
    </Box>
  );
}
