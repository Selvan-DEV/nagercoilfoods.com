"use client";

import RecentOrders from "@/components/admin-panel/recent-orders/RecentOrders";
import { getRecentOrdersList } from "@/services/ShopManagement/ShopDashboard";
import { Box, CircularProgress, Paper } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { IOrderStatus, IRecentOrders } from "../../model/ShopManagementModel";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { ILoginResponse } from "@/models/UserManagement/IUserData";
import {
  getOrderStatuses,
  updateOrderStatus,
} from "@/services/ShopManagement/ShopManagement";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import ConfirmModal from "@/shared/ConfirmModal/ConfirmModal";
import { initSocket } from "@/lib/socket";

export default function NewOrdersPage() {
  const shopData = getSessionStorageItem("adminData") as ILoginResponse;

  const [loading, setLoading] = useState<boolean>(false);
  const [recentOrders, setRecentOrders] = useState<IRecentOrders[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<IOrderStatus[]>([]);
  const [shopId, setShopId] = useState<number>(0);
  const [refreshId, setRefreshId] = useState<number>(0);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [statusLoader, setStatusUpdateLoader] = useState<boolean>(false);
  const [selectedStatusToChange, setSelectedStatus] = useState<{
    orderId: number;
    orderStatusId: number;
  } | null>(null);

  useEffect(() => {
    if (shopData && shopData.user && shopData.user.shopId) {
      setShopId(shopData.user.shopId);
    }
  }, [shopData, shopId]);

  useEffect(() => {
    async function fetchOrderStatuses(): Promise<void> {
      if (!shopId) return;
      setLoading(true);
      try {
        const response = await getOrderStatuses(shopId);
        setOrderStatuses(response);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        showErrorToast(axiosError);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderStatuses();
  }, [shopId]);

  const getRecentOrders = useCallback(async (isRefreshNeeded: boolean) => {
    try {
      setLoading(isRefreshNeeded);
      const recentOrders = await getRecentOrdersList();
      setLoading(false);
      if (recentOrders) {
        setRecentOrders(recentOrders);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRecentOrders(true);
  }, [getRecentOrders]);

  useEffect(() => {
    const socket = initSocket();

    socket.on("orderUpdate", (data) => {
      getRecentOrders(false);
    });

    return () => {
      socket.off("orderUpdate");
    };
  }, [getRecentOrders]);

  const onStatusChange = (payload: {
    orderId: number;
    orderStatusId: number;
  }) => {
    if (!payload) {
      return;
    }
    setSelectedStatus(payload);
    setConfirmModalOpen(true);
  };

  const onConfirm = (isConfirmed: boolean) => {
    if (!isConfirmed) {
      setConfirmModalOpen(false);
      return;
    }

    if (selectedStatusToChange) {
      changeOrderStatus(selectedStatusToChange);
    }
  };

  const changeOrderStatus = async (payload: {
    orderId: number;
    orderStatusId: number;
  }) => {
    try {
      const payloadData = {
        shopId: shopData.user.shopId || 0,
        ...payload,
      };
      setStatusUpdateLoader(true);
      const response = await updateOrderStatus(payloadData);
      setStatusUpdateLoader(false);
      setConfirmModalOpen(false);
      if (response === 1) {
        getRecentOrders(true);
        toast.success("Order Status Updated Sucessfully");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      showErrorToast(axiosError);
    }
  };

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
          orderStatuses={orderStatuses}
          onStatusChange={onStatusChange}
        />
      )}

      {selectedStatusToChange && (
        <ConfirmModal
          open={confirmModalOpen}
          loading={statusLoader}
          onSubmit={(isOpen) => onConfirm(isOpen)}
          message="Are you sure you want to change the Status of this Order?"
          title="Confirm"
        />
      )}
    </Box>
  );
}
