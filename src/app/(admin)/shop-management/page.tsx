"use client";

import {
  getAdminToken,
  getShopId,
} from "@/shared/SharedService/StorageService";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Shop() {
  const router = useRouter();

  useEffect(() => {
    const userToken = getAdminToken();
    const shopId = getShopId();
    if (!userToken || !shopId) {
      router.push("/shop-dashboard-login");
      return;
    }
  }, [router]);

  return <div>Dashboard Home</div>;
}

export default Shop;
