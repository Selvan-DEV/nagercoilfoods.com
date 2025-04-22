import { ICoupon, IDashboardSummaryItems, IOrderItemsSummary, IOrderStatus } from "@/app/(admin)/shop-management/model/ShopManagementModel";
import { IProduct, ICategories, ICreateProductReview, IReviewShopView } from "@/models/IProduct";
import { ILoginResponse, IUserData } from "@/models/UserManagement/IUserData";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import adminAxiosInstance from "@/utils/adminAxiosInstance";

const shopId = (getSessionStorageItem("adminData") as ILoginResponse)?.user?.shopId || 0;

export const getDashboardSummaryCards = async (shopId: number) => {
  try {
    const response = await adminAxiosInstance.get<IDashboardSummaryItems[]>(`/shop/${shopId}/dashboard/summary-cards`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomersByShopId = async (shopId: number, searchQuery: string) => {
  try {
    const response = await adminAxiosInstance.get<IUserData[]>(`/shop/${shopId}/customers?query=${searchQuery}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByShopId = async (shopId: number) => {
  try {
    const response = await adminAxiosInstance.get<IProduct[]>(`/shop/${shopId}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (product: IProduct): Promise<{ id: number }> => {
  try {
    const response = await adminAxiosInstance.post<IProduct>(`/shop/${product.shopId}/create-product`, product);
    return response.data as { id: number };
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (product: IProduct) => {
  try {
    const response = await adminAxiosInstance.put<IProduct>(`/shop/${product.shopId}/update-product`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesByShopId = async (shopId: number) => {
  try {
    const response = await adminAxiosInstance.get<ICategories[]>(`/shop/${shopId}/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrdersByShopId = async (shopId: number, status: string, isDownload: string) => {
  try {
    const response = await adminAxiosInstance.get<any>(`/shop/${shopId}/orders?status=${status}&isDownload=${isDownload}`,
      {
        responseType: isDownload === "Yes" ? 'blob' : 'json',
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderItemsByOrderId = async (shopId: number, orderId: number) => {
  try {
    const response = await adminAxiosInstance.get<IOrderItemsSummary>(`/shop/${shopId}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderStatuses = async (shopId: number) => {
  try {
    const response = await adminAxiosInstance.get<IOrderStatus[]>(`/shop/orderStatuses`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (payload: { orderId: number, orderStatusId: number, shopId: number }) => {
  try {
    const response = await adminAxiosInstance.put<number>(`/shop/${payload.shopId}/orders/updateOrderStatus`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByShopIdAndProductId = async (shopId: number, productId: number): Promise<IProduct> => {
  try {
    const response = await adminAxiosInstance.get<IProduct>(`/shop/${shopId}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCoupons = async (shopId: number): Promise<ICoupon[]> => {
  try {
    const response = await adminAxiosInstance.get<ICoupon[]>(`/shop/${shopId}/coupons`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCouponById = async (couponId: number): Promise<ICoupon> => {
  try {
    const response = await adminAxiosInstance.get<ICoupon>(`/shop/${shopId}/coupons/${couponId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCoupon = async (couponData: ICoupon): Promise<number> => {
  try {
    const response = await adminAxiosInstance.post<number>(`/shop/${shopId}/coupons`, couponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCoupon = async (couponData: ICoupon): Promise<number> => {
  try {
    const response = await adminAxiosInstance.put<number>(`/shop/${shopId}/coupons/${couponData.id}/update`, couponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCouponStatus = async (couponData: { isActive: boolean }, couponId: number): Promise<number> => {
  try {
    const shopData = getSessionStorageItem("adminData") as ILoginResponse;
    const response = await adminAxiosInstance.put<number>(`/shop/${shopData.user.shopId}/coupons/${couponId}/update-status`, couponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderExportFile = async (): Promise<Blob> => {
  try {
    const response = await adminAxiosInstance.get(`/orders/export-order`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReviewStatus = async (reviewId: number, isShow: boolean): Promise<number> => {
  try {
    const response = await adminAxiosInstance.put<number>(`/shop/${shopId}/reviews/${reviewId}/update-status`, { isShow });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllReviewsByShopId = async (): Promise<IReviewShopView[]> => {
  try {
    const response = await adminAxiosInstance.get(`/shop/${shopId}/reviews`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const productAction = async (product: { productId: number; isPopular: number; }) => {
  try {
    const response = await adminAxiosInstance.put<{ productId: number; isPopular: number; }>(`/shop/${shopId}/product-action`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
};
