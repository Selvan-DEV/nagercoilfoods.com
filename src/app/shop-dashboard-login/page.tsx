"use client";

import ShopLogin from "@/components/admin-panel/Login/Login";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Shop() {
  const router = useRouter();

  useEffect(() => {
    // router.push("/shop/dashboard");
  }, [router]);

  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default Shop;
