"use client";

import AdvancedDashboard from "@/components/admin-panel/Dashboard";
import { ILoginResponse } from "@/models/UserManagement/IUserData";
import { getRecentOrdersList } from "@/services/ShopManagement/ShopDashboard";
import { getDashboardSummaryCards } from "@/services/ShopManagement/ShopManagement";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { Box, CircularProgress, Paper } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import {
  IDashboardSummaryItems,
  IRecentOrders,
} from "../model/ShopManagementModel";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function ShopDashbord() {
  const shopData = getSessionStorageItem("adminData") as ILoginResponse;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryCards, setSummaryCards] = useState<IDashboardSummaryItems[]>(
    []
  );
  const [recentOrders, setRecentOrders] = useState<IRecentOrders[]>([]);

  useEffect(() => {
    socket.on("orderUpdate", (order) => {
      getRecentOrders();
    });

    return () => {
      socket.off("orderUpdate");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSummaryCards = useCallback(async () => {
    if (!shopData?.user?.shopId) return;
    setLoading(true);
    try {
      const response = await getDashboardSummaryCards(shopData.user.shopId);
      if (response && response.length) {
        setSummaryCards(response);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [shopData?.user?.shopId]);

  useEffect(() => {
    if (shopData?.user?.shopId) {
      fetchSummaryCards();
    }
  }, [fetchSummaryCards, shopData?.user?.shopId]);

  const getRecentOrders = useCallback(async () => {
    if (!shopData?.user?.shopId) return;
    try {
      setLoading(true);
      const recentOrders = await getRecentOrdersList(shopData.user.shopId);
      setLoading(false);
      if (recentOrders) {
        setRecentOrders(recentOrders.slice(0, 5));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [shopData?.user?.shopId]);

  useEffect(() => {
    getRecentOrders();
  }, [getRecentOrders]);

  return (
    <Box>
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
        <AdvancedDashboard
          summaryCards={summaryCards}
          recentOrders={recentOrders}
          shopId={shopData?.user?.shopId || 0}
        />
      )}
    </Box>
  );
}
