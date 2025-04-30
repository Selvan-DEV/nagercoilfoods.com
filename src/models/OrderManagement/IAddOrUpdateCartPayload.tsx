import { IProduct } from "../IProduct";

export interface IAddOrUpdateCartPayload {
  productId: number;
  sessionId: string;
  quantity: number;
  id?: number;
  userId: number;
  variantId: number;
}

export interface ICartProducts {
  id: number;
  productId: number;
  quantity: number;
  sessionId: string;
  price: number;
  product: IProduct;
  variant: string;
}

interface ICartSummary {
  totalQuantity: number;
  totalPrice: string;
}

export interface ICartSummayItems {
  cartItems: ICartProducts[];
  summary: ICartSummary;
}

export interface IOrderItem {
  userId: number;
  paymentMethodId: string;
  orderAmount: number | string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  shippingAddressId: number;
  billingAddressId: number;
  cartItem: ICartSummayItems;
  shopId: number;
  orderStatusId: number;
  toEmailAddress: string;
  deliveryCharge: number;
  discountValue: number;
}

export interface ICheckOutFormFields {
  email: string;
  addressId: number;
  userId: number;
  name: string;
  phoneNumber: string;
  pincode: string;
  country: string;
  address: string;
  city: string;
  state: string;
  landmark: string;
  alternatePhoneNumber: string;
  addressType: string;
  isActiveAddress: boolean;
  paymentMethodId: string;
}

export interface ICheckOutSessionAddress {
  addressId: number;
  address: string;
  addressType: string;
  alternatePhoneNumber: string;
  city: string;
  isActiveAddress: number;
  landmark: string;
  locality: string;
  phoneNumber: string;
  pincode: number;
  state: string;
  userId: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICheckoutSessionInfo {
  id: number;
  userId: number;
  shippingAddressId: number;
  billingAddressId: number;
  discountCode: string | null;
  discountValue: string;
  deliveryCharge: string;
  totalPrice: string;
  finalAmount: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  shippingAddress: ICheckOutSessionAddress;
  billingAddress: ICheckOutSessionAddress;
}
