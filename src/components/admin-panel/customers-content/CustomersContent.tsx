"use client";

import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import SpinnerComponent from "@/components/site-components/page-loader/SpinnerComponent";
import NoDataFound from "@/components/site-components/NoDataFound/NoDataFound";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { ILoginResponse, IUserData } from "@/models/UserManagement/IUserData";
import { getCustomersByShopId } from "@/services/ShopManagement/ShopManagement";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import CustomerList from "../CustomerList";

export default function CustomersContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  const [shopData, setShopData] = useState<ILoginResponse | null>(null);
  const [customers, setCustomers] = useState<IUserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = getSessionStorageItem(
      "adminData"
    ) as ILoginResponse | null;
    setShopData(storedData);
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!shopData?.user?.shopId) return;

    setLoading(true);
    setCustomers([]);
    setError(null);
    try {
      const response = await getCustomersByShopId(
        shopData.user.shopId,
        searchQuery || ""
      );
      setCustomers(response || []);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      showErrorToast(axiosError);
      setError(
        axiosError?.response?.data?.message || "Failed to fetch Customers"
      );
    } finally {
      setLoading(false);
    }
  }, [searchQuery, shopData]);

  useEffect(() => {
    if (shopData?.user?.shopId) {
      fetchOrders();
    }
  }, [shopData, searchQuery, fetchOrders]);

  if (!shopData?.user?.shopId) {
    return <NoDataFound message="No Shop Data Found" />;
  }

  return (
    <Box>
      {loading ? <SpinnerComponent /> : <CustomerList customers={customers} />}
      {!loading && !customers.length && (
        <NoDataFound message="No Customers found" />
      )}
    </Box>
  );
}
