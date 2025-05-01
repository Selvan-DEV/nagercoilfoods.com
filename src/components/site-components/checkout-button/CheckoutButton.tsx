"use client";

import { useState } from "react";
import Script from "next/script";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";
import { useCartStore } from "@/store/site-store/useCartStore";
import {
  ICartSummayItems,
  ICheckoutSessionInfo,
  IOrderItem,
} from "@/models/OrderManagement/IAddOrUpdateCartPayload";
import { markCartItemAsOrder } from "@/services/OrderService/OrderService";
import { useGlobalLoaderStore } from "@/store/shared-store/useGlobalLoaderStore";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useUser from "@/customHooks/useUser";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckOutButton = (props: {
  checkoutSessionData: ICheckoutSessionInfo;
  cartState: ICartSummayItems;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { checkoutSessionData, cartState, onClose } = props;
  const clearCart = useCartStore((state) => state.clearCart);
  const { showLoader, hideLoader } = useGlobalLoaderStore((state) => state);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Create order
      const orderPayload = {
        amount: checkoutSessionData.finalAmount,
        user: {
          name:
            checkoutSessionData.shippingAddress.firstName +
            " " +
            checkoutSessionData.shippingAddress.lastName,
          email: checkoutSessionData.email,
          contact: checkoutSessionData.shippingAddress.phoneNumber,
        },
      };

      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderPayload }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My E-Commerce",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            showLoader();
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            if (!verifyRes.ok) {
              throw new Error(`HTTP error! status: ${verifyRes.status}`);
            }

            await verifyRes.json();

            const paymentMethodDetails = await fetch(
              "/api/razorpay/payment-details",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  payment_id: response.razorpay_payment_id,
                }),
              }
            );

            const data = await paymentMethodDetails.json();
            if (data.id) {
              saveCardItemsAsOrder(data.id);
            }
          } catch (verifyError) {
            console.error("Verification error:", verifyError);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: orderPayload.user.name,
          email: orderPayload.user.email,
          contact: orderPayload.user.contact,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed.");
    } finally {
      hideLoader();
      setLoading(false);
    }
  };

  const saveCardItemsAsOrder = async (
    paymentMethodId: string
  ): Promise<void> => {
    try {
      showLoader();

      const payload = {
        paymentMethodId: paymentMethodId,
        userId: checkoutSessionData.userId,
        shopId: 1,
        shippingAddressId: checkoutSessionData.shippingAddressId,
        billingAddressId: checkoutSessionData.billingAddressId,
        orderAmount: checkoutSessionData.finalAmount,
        cartItem: cartState,
        orderStatusId: 1,
        toEmailAddress: checkoutSessionData.email,
        deliveryCharge: Number(checkoutSessionData.deliveryCharge),
        discountValue: Number(checkoutSessionData.discountValue),
        checkoutSessionId: checkoutSessionData.id,
      } as IOrderItem;

      const response = await markCartItemAsOrder(payload);
      if (response?.insertId) {
        onClose();
        router.push("/");
        clearCart();
      }

      hideLoader();
    } catch (error) {
      hideLoader();
      const err = error as AxiosError<ErrorResponse>;
      showErrorToast(err);
    }
  };

  return (
    <Box>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <LoadingButton
        type="submit"
        loading={loading}
        loadingPosition="start"
        variant="contained"
        onClick={handlePayment}
        sx={{
          width: { xs: "100%", sm: "fit-content" },
        }}
      >
        Confirm & Pay
      </LoadingButton>
    </Box>
  );
};

export default CheckOutButton;
