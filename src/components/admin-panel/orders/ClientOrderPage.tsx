"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import SpinnerComponent from "@/components/site-components/page-loader/SpinnerComponent";
import {
  IOrderItemsSummary,
  IOrderStatus,
} from "@/app/(admin)/shop-management/model/ShopManagementModel";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { IUserData, ILoginResponse } from "@/models/UserManagement/IUserData";
import {
  getOrderStatuses,
  getOrderItemsByOrderId,
  updateOrderStatus,
} from "@/services/ShopManagement/ShopManagement";
import ConfirmModal from "@/shared/ConfirmModal/ConfirmModal";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import OrderItems from "../OrderItems";
import { AxiosError } from "axios";
import { IOrderDetails } from "@/models/OrderManagement/IAddOrUpdateCartPayload";

interface ClientOrderPageProps {
  orderid: string;
}

const ClientOrderPage = ({ orderid }: ClientOrderPageProps) => {
  const [adminData, setAdminData] = useState<IUserData | null>(null);
  const [orderItems, setOrderItems] = useState<IOrderDetails[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<IOrderStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedStatusToChange, setSelectedStatus] = useState<{
    orderId: number;
    orderStatusId: number;
  } | null>(null);

  useEffect(() => {
    const data = getSessionStorageItem("adminData") as ILoginResponse | null;
    if (data?.user) {
      setAdminData(data.user);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!adminData?.shopId) return;
      setLoading(true);
      try {
        const [statuses, orderData] = await Promise.all([
          getOrderStatuses(adminData.shopId),
          getOrderItemsByOrderId(adminData.shopId, Number(orderid)),
        ]);
        setOrderStatuses(statuses);
        setOrderItems(orderData);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        showErrorToast(axiosError);
      } finally {
        setLoading(false);
      }
    };

    if (adminData?.shopId) {
      fetchData();
    }
  }, [adminData, orderid]);

  const changeOrderStatus = async (payload: {
    orderId: number;
    orderStatusId: number;
  }) => {
    try {
      const payloadData = {
        shopId: adminData?.shopId || 0,
        ...payload,
      };
      const response = await updateOrderStatus(payloadData);
      setConfirmModalOpen(false);
      if (response === 1 && adminData?.shopId) {
        const updatedOrder = await getOrderItemsByOrderId(
          adminData.shopId,
          Number(orderid)
        );
        setOrderItems(updatedOrder);
        toast.success("Order Status Updated Successfully");
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

  if (loading || !adminData) {
    return <SpinnerComponent />;
  }

  return (
    <>
      {orderItems && orderItems.length && (
        <Box>
          <OrderItems
            orderDetails={orderItems}
            orderStatuses={orderStatuses}
            onStatusChange={onStatusChange}
          />
        </Box>
      )}

      {selectedStatusToChange && (
        <ConfirmModal
          open={confirmModalOpen}
          onSubmit={onConfirm}
          loading={false}
          message="Are you sure you want to change the Status of this Order?"
          title="Confirm"
        />
      )}
    </>
  );
};

export default ClientOrderPage;
