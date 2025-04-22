"use client";

import ProductTable from "@/components/admin-panel/Products";
import NoDataFound from "@/components/site-components/NoDataFound/NoDataFound";
import SpinnerComponent from "@/components/site-components/page-loader/SpinnerComponent";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { IProduct } from "@/models/IProduct";
import { ILoginResponse } from "@/models/UserManagement/IUserData";
import {
  getProductsByShopId,
  productAction,
} from "@/services/ShopManagement/ShopManagement";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { Paper } from "@mui/material";
import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ConfirmModal from "@/shared/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";

export default function Products() {
  const shopData = getSessionStorageItem("adminData") as ILoginResponse;

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [shopId, setShopId] = useState<number>(0);
  const [actionLoader, setActionLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [selectedProduct, setProduct] = useState<{
    productId: number;
    isPopular: number;
  } | null>(null);

  useEffect(() => {
    if (shopData && shopData.user && shopData.user.shopId) {
      setShopId(shopData.user.shopId);
    }
  }, [shopData, shopId]);

  const fetchProducts = useCallback(async () => {
    if (!shopId) return;

    setLoading(true);
    try {
      const response = await getProductsByShopId(shopId);
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
  }, [shopId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onActionUpdate = (formData: {
    productId: number;
    isPopular: number;
  }) => {
    setProduct(formData);
    setConfirmModalOpen(true);
  };

  const onConfirm = async (isOpen: boolean) => {
    if (!isOpen) {
      setProduct(null);
      setConfirmModalOpen(false);
      return;
    }
    try {
      const payload = selectedProduct as {
        productId: number;
        isPopular: number;
      };
      setActionLoader(true);
      const response = await productAction(payload);
      setActionLoader(false);
      if (response) {
        fetchProducts();
        setProduct(null);
        setConfirmModalOpen(false);
        toast.success("Success");
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setActionLoader(false);
    }
  };

  return (
    <Paper sx={{ marginTop: "20px", margin: "25px", minHeight: "100vh" }}>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <ProductTable products={products} onActionUpdate={onActionUpdate} />
      )}
      {!loading && !products.length && (
        <NoDataFound message="No products found" />
      )}
      {selectedProduct && (
        <ConfirmModal
          open={confirmModalOpen}
          loading={actionLoader}
          onSubmit={(isOpen) => onConfirm(isOpen)}
          message="Are you sure you want to proceed?"
          title="Confirm"
        />
      )}
    </Paper>
  );
}
