"use client";

import OrderList from "@/components/admin-panel/Orders";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { ILoginResponse } from "@/models/UserManagement/IUserData";
import {
  getOrdersByShopId,
  getOrderStatuses,
  updateOrderStatus,
} from "@/services/ShopManagement/ShopManagement";
import ConfirmModal from "@/shared/ConfirmModal/ConfirmModal";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { Paper, Box, CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { IOrder, IOrderStatus } from "../model/ShopManagementModel";
import NoDataFound from "@/components/site-components/NoDataFound/NoDataFound";

export default function ShopOrders() {
  const shopData = getSessionStorageItem("adminData") as ILoginResponse;

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [orderStatuses, setOrderStatuses] = useState<IOrderStatus[]>([]);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [selectedStatusToChange, setSelectedStatus] = useState<{
    orderId: number;
    orderStatusId: number;
  } | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!shopData?.user?.shopId) return;
    setLoading(true);

    setLoading(true);
    setOrders([]);
    setError(null);
    try {
      const response = await getOrdersByShopId(
        shopData.user.shopId,
        status || "",
        "No"
      );
      setOrders(response || []);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      showErrorToast(axiosError);
      setError(axiosError?.response?.data?.message || "Failed to fetch Orders");
    } finally {
      setLoading(false);
    }
  }, [shopData?.user?.shopId, status]);

  useEffect(() => {
    if (shopData.user.shopId) {
      fetchOrders();
    }
  }, [fetchOrders, shopData?.user?.shopId, status]);

  useEffect(() => {
    async function fetchOrderStatuses(): Promise<void> {
      if (!shopData?.user?.shopId) return;
      setLoading(true);
      try {
        const response = await getOrderStatuses(shopData.user.shopId);
        setOrderStatuses(response);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        showErrorToast(axiosError);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderStatuses();
  }, [shopData?.user?.shopId]);

  const changeOrderStatus = async (payload: {
    orderId: number;
    orderStatusId: number;
  }) => {
    try {
      const payloadData = {
        shopId: shopData.user.shopId || 0,
        ...payload,
      };
      const response = await updateOrderStatus(payloadData);
      setConfirmModalOpen(false);
      if (response === 1) {
        fetchOrders();
        toast.success("Order Status Updated Sucessfully");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      showErrorToast(axiosError);
    }
  };

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

  return (
    <Paper sx={{ marginTop: "20px", margin: "25px", minHeight: "100vh" }}>
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
          <OrderList
            orders={orders}
            orderStatuses={orderStatuses}
            onStatusChange={onStatusChange}
            shopId={shopData?.user?.userId || 0}
          />
        )}
      </Box>

      {!loading && !orders.length && <NoDataFound message="No Orders found" />}

      {selectedStatusToChange && (
        <ConfirmModal
          open={confirmModalOpen}
          onSubmit={(isOpen) => onConfirm(isOpen)}
          message="Are you sure you want to change the Status of this Order?"
          title="Confirm"
        />
      )}
    </Paper>
  );
}
