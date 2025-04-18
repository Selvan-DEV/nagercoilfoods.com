import { SignInFormValues } from "@/components/admin-panel/Login/Login";
import { IChangePasswordFormValues } from "@/components/site-components/UserManagement/ForgotPassword";
import { ILoginResponse, IUserData, IAddress, IDiscountPaylod } from "@/models/UserManagement/IUserData";
import axiosInstance from "@/utils/axiosInstance";


export const adminLogin = async (payload: SignInFormValues) => {
  try {
    const response = await axiosInstance.post<ILoginResponse[]>("/users/login", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerLogin = async (payload: SignInFormValues) => {
  try {
    const response = await axiosInstance.post<ILoginResponse>("/users/login", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerEdit = async (payload: IUserData) => {
  try {
    const response = await axiosInstance.put<IUserData>(`/users/${payload.userId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerAddresses = async (userId: number) => {
  try {
    const response = await axiosInstance.get<IAddress[]>(`/users/${userId}/addresses`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCustomerAddress = async (address: IAddress) => {
  const response = await axiosInstance.post(`/users/${address.userId}/address`, address);
  return response.data;
};

export const editCustomerAddress = async (payload: IAddress) => {
  const response = await axiosInstance.put(`/users/address/${payload.addressId}`, payload);
  return response.data;
};

export const deleteCustomerAddress = async (payload: { userId: number | null | undefined; addressId: number }) => {
  const response = await axiosInstance.delete(`/users/address/${payload.addressId}`);
  return response.data;
};

export const getCustomerActiveAddress = async (userId: number) => {
  try {
    const response = await axiosInstance.get<IAddress[]>(`/users/${userId}/addresses`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (values: IChangePasswordFormValues) => {
  try {
    const response = await axiosInstance.post(`/users/forgot-password`, values);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerCustomer = async (values: IUserData) => {
  try {
    const response = await axiosInstance.post(`/users/register`, values);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDiscount = async (values: IDiscountPaylod) => {
  try {
    const response = await axiosInstance.post(`/users/validate-coupon`, values);
    return response.data;
  } catch (error) {
    throw error;
  }
};