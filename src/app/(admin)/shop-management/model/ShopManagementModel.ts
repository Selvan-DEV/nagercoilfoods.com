import { IProduct } from "@/models/IProduct";
import { IAddress } from "@/models/UserManagement/IUserData";


export interface IDashboardSummaryItems {
  key: string;
  value: number;
  icon: string;
  route: string;
  change: string;
}

export interface IOrder {
  orderId: number;
  createdAt: string;
  updatedAt: string;
  deliveryAddressId: number;
  shippingAddressId: number;
  orderAmount: number;
  orderStatus: string | null;
  paymentMethodId: string;
  userId: number;
  shopId: number;
  deliveryAddress: IAddress
}

export interface IRecentOrders extends IOrder {
  products: IRecentOrderProducts[];
  billingAddress: IAddress;
  deliveryAddress: IAddress;
}

export interface IRecentOrderProducts {
  productId: number;
  productName: string;
  orderQuantity: number;
}

export interface IOrderStatus {
  orderStatusId: number;
  orderStatusName: string;
}

export interface IOrderItems {
  orderItemId: number;
  orderId: number;
  productId: number;
  price: number;
  quantity: number;
  product: IProduct
}

export interface IOrderItemsSummary {
  orderId: number;
  totalAmount: number;
  orderStatus: string;
  orderItems: IOrderItems[];
}

export interface IMonthlyRevenueData {
  id: number;
  month: string;
  revenue: number;
}

export interface IDailyRevenueData {
  id: number;
  date: string;
  revenue: number;
}

export interface ICoupon {
  id: number;
  code: string;
  type: "fixed" | "percentage";
  value: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: number;
  userId: number | null;
  createdAt: string;
  updatedAt: string;
  ShopId: number;
}