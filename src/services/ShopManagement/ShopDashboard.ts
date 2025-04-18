import { IDailyRevenueData, IMonthlyRevenueData, IRecentOrders } from "@/app/(admin)/shop-management/model/ShopManagementModel";
import adminAxiosInstance from "@/utils/adminAxiosInstance";

export const getRecentOrdersList = async (shopId: number) => {
  try {
    const response = await adminAxiosInstance.get<IRecentOrders[]>(
      `/shop/dashboard/${shopId}/recent-orders`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMonthlyRevenue = async (shopId: number) => {
  try {
    const response = await adminAxiosInstance.get<IMonthlyRevenueData[]>(
      `/shop/dashboard/${shopId}/monthly-revenue`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getDailyRevenue = async (shopId: number) => {
  try {
    const response = await adminAxiosInstance.get<IDailyRevenueData[]>(
      `/shop/dashboard/${shopId}/daily-revenue`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}