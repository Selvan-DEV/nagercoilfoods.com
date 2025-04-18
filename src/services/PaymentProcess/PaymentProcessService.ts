import { IPaymentIntentPayload } from "@/models/PaymentProcess/PaymentModel";
import axiosInstance from "@/utils/axiosInstance";

export const deleteCardByPaymentMethodId = async (paymentMethodId: string) => {
  try {
    const response = await axiosInstance.delete<{ paymentMethodId: string; }>(`/payment/${paymentMethodId}/deleteCard`);
    return response.data;
  } catch (error) {
    console.error("Failed to get Producrs:", error);
    throw error;
  }
};

export const createPaymentIntent = async (paymentDetails: IPaymentIntentPayload) => {
  try {
    const response = await axiosInstance.post(`/payment/createPaymentIntent`, paymentDetails);
    return response.data;
  } catch (error) {
    console.error("Failed to get Producrs:", error);
    throw error;
  }
};