"use client";

import React, { useEffect, useState } from "react";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { ILoginResponse } from "@/models/UserManagement/IUserData";
import ProductWithReviews from "@/components/shared/reviews-cards/ReviewsCards";

export default function ReviewPage() {
  const shopData = getSessionStorageItem("adminData") as ILoginResponse;
  const [shopId, setShopId] = useState<number>(0);

  useEffect(() => {
    if (shopData?.user?.shopId) {
      setShopId(shopData.user.shopId);
    }
  }, [shopData]);

  return <ProductWithReviews shopId={shopId} isActionAccess={true} />;
}
