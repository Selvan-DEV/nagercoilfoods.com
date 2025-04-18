"use client";

import { ILoginResponse } from "@/models/UserManagement/IUserData";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { Box, CircularProgress, Paper } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { ICoupon } from "../model/ShopManagementModel";
import { getAllCoupons } from "@/services/ShopManagement/ShopManagement";
import CouponsComponent from "@/components/admin-panel/coupons/Coupons";

export default function CouponsPage() {
  const shopData = getSessionStorageItem("adminData") as ILoginResponse;

  const [loading, setLoading] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [shopId, setShopId] = useState<number>(0);

  useEffect(() => {
    if (shopData && shopData.user && shopData.user.shopId) {
      setShopId(shopData.user.shopId);
    }
  }, [shopData, shopId]);

  const getCoupons = useCallback(
    async (isRefresh: boolean) => {
      if (!shopId) return;
      try {
        setLoading(isRefresh);
        const coupons = await getAllCoupons(shopId);
        setLoading(false);
        if (coupons) {
          setCoupons(coupons);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [shopId]
  );

  useEffect(() => {
    getCoupons(true);
  }, [getCoupons]);

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
        <CouponsComponent coupons={coupons} getCoupons={getCoupons} />
      )}
    </Box>
  );
}
