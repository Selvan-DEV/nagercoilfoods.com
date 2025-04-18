"use client";

import React from "react";
import { useCartStore } from "../../../store/site-store/useCartStore";
import NoDataFound from "@/components/site-components/NoDataFound/NoDataFound";
import CheckoutPage from "@/components/site-components/PaymentProcess/CheckoutProcess/CheckoutBeta/CheckoutPageBeta";

export default function CheckOutPage() {
  const cartProductsWithSummary = useCartStore((state) => state.cartItems);

  return (
    <>
      {cartProductsWithSummary ? (
        <CheckoutPage cartProductsWithSummary={cartProductsWithSummary} />
      ) : (
        <NoDataFound message="No cart items found" isButtonShow={true} />
      )}
    </>
  );
}
