import { ICheckoutSessionFormValues } from "@/components/site-components/PaymentProcess/CheckoutProcess/CheckoutBeta/CheckoutPageBeta";
import { ErrorResponse } from "@/components/showErrorToast";
import { IOrderItem } from "@/models/OrderManagement/IAddOrUpdateCartPayload";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";


export const markCartItemAsOrder = async (paymentDetails: IOrderItem) => {
  try {
    const response = await axiosInstance.post(`/orders/${paymentDetails.userId}/createOrder`, paymentDetails);
    return response.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error as AxiosError<ErrorResponse>;
  }
};

export const getOrdersByUserId = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/orders/${userId}/getOrdersByUserId`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderByOrderId = async (orderId: number) => {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCartItem = async (payload: { cartItemId: number, quantity: number }) => {
  try {
    const response = await axiosInstance.put(`/orders/updateCartItem`, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to update Cart:", error);
    throw error;
  }
};

export const deleteCartItem = async (cartId: number) => {
  const response = await axiosInstance.delete(`/orders/deleteCartItems/${cartId}`);
  return response.data;
};

export const createCheckoutSession = async (payload: ICheckoutSessionFormValues) => {
  try {
    const response = await axiosInstance.post(`/orders/checkout-session`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCheckoutSessionDataById = async (checkoutSessionId: number) => {
  try {
    const response = await axiosInstance.get(`/orders/checkout-session/${checkoutSessionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
