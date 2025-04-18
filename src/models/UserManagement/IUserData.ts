export interface IUserData {
  email: string;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  isPrimaryUser?: boolean;
  password?: string;
  phoneNumber: number | string;
  userId?: number | null;
  ImageURL?: string
  role?: string;
  shopId?: number;
}

export interface ILoginResponse {
  token: string;
  user: IUserData;
}

export interface IAddress {
  email: string;
  addressId: number | string;
  userId: number | string;
  firstName: string;
  lastName: string;
  phoneNumber: number | string;
  pincode: number | string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark: string;
  alternatePhoneNumber: number | string;
  addressType: string;
  isActiveAddress: boolean | number;
  line1: string;
  line2: string;
  postalCode: string;
  country: string;
}

export interface IDiscountPaylod {
  userId: number;
  code: string;
}