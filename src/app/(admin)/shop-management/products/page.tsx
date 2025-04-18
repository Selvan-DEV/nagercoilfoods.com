"use client";

import ProductTable from "@/components/admin-panel/Products";
import NoDataFound from "@/components/site-components/NoDataFound/NoDataFound";
import SpinnerComponent from "@/components/site-components/page-loader/SpinnerComponent";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { IProduct } from "@/models/IProduct";
import { ILoginResponse } from "@/models/UserManagement/IUserData";
import { getProductsByShopId } from "@/services/ShopManagement/ShopManagement";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { Paper } from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

export default function Products() {
  const shopData = getSessionStorageItem("adminData") as ILoginResponse;

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts(): Promise<void> {
      if (!shopData?.user?.shopId) return;

      setLoading(true);
      try {
        const response = await getProductsByShopId(shopData.user.shopId);
        setProducts(response);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        showErrorToast(axiosError);
        setError(
          axiosError?.response?.data?.message || "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    }

    // Call the fetch function on component mount
    if (shopData.user.shopId) {
      fetchProducts();
    }
  }, [shopData.user.shopId]);

  return (
    <Paper sx={{ marginTop: "20px", margin: "25px", minHeight: "100vh" }}>
      {loading ? <SpinnerComponent /> : <ProductTable products={products} />}
      {!loading && !products.length && (
        <NoDataFound message="No products found" />
      )}
    </Paper>
  );
}
