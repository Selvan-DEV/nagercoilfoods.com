import {
  IProduct,
  ICategoriesWithProducts,
  ICreateProductReview,
} from "@/models/IProduct";
import {
  IAddOrUpdateCartPayload,
  ICartSummayItems,
} from "@/models/OrderManagement/IAddOrUpdateCartPayload";
import axiosInstance from "@/utils/axiosInstance";

/** Service to get the list of Products */
export const getProducts = async (payload: any) => {
  try {
    const response = await axiosInstance.get<IProduct[]>("/products", {
      params: payload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** Service to get the list of Categories with products */
export const getCategoriesWithProducts = async () => {
  try {
    const response = await axiosInstance.get<ICategoriesWithProducts[]>(
      "/products/categories"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get Producrs:", error);
    throw error;
  }
};

/** Get Product By Product Unique Name */
export const getProductByUniqueName = async (productUniqueName: string) => {
  try {
    const response = await axiosInstance.get<IProduct>(
      "/products/" + productUniqueName
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get Producrs:", error);
    throw error;
  }
};

export const createReview = async (reviewInfo: ICreateProductReview) => {
  try {
    const response = await axiosInstance.post<ICreateProductReview>(
      "/products/review",
      reviewInfo
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get Producrs:", error);
    throw error;
  }
};

export const addToCartProduct = async (
  productInfo: IAddOrUpdateCartPayload
) => {
  try {
    const response = await axiosInstance.post<IAddOrUpdateCartPayload>(
      "/orders/addOrUpdateProductToCart",
      productInfo
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCartItems = async (cartItemId: string | number) => {
  try {
    const response = await axiosInstance.get<ICartSummayItems>(
      "/orders/cartItems/" + cartItemId
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get Producrs:", error);
    throw error;
  }
};

export const fetchProductReviewsByProductId = async (productId: number) => {
  try {
    const response = await axiosInstance.get<ICreateProductReview[]>(
      "/products/" + productId + "/reviews"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get Producrs:", error);
    throw error;
  }
};

export const getPopularProducts = async () => {
  try {
    const response = await axiosInstance.get<IProduct[]>(
      "/products/popular-products"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get Producrs:", error);
    throw error;
  }
};
