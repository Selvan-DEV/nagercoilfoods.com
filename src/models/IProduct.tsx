export interface IProduct {
  id?: number;
  sku: string;
  brand: string;
  brandId?: number;
  createdAt?: string;
  description: string;
  tags?: string;
  warrantyInformation?: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  productName: string;
  metaTitle: string;
  metaDescription: string;
  productQuantity: number;
  stockStatus?: string;
  visibility?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  rating?: number;
  reviewsCount?: number;
  averageReviewRating?: number;
  uniqueName?: string;
  categoryId: number;
  shopId?: number;
  supplierId?: number;
  taxClass?: string;
  shippingClass?: string;
  variants: IProductPriceVariant[];
  offerPrice: string;
  ingredients: string;
  offerStartDate: string;
  offerEndDate: string;
  updatedAt: string;
  categoryName: string;
  selectedQuantity?: number;
  averageRating: number;
  reviewCount: number;
  variantId: number;
}

export interface IProductPriceVariant {
  variantsId?: number;
  productId: number;
  variantName: string;
  additionalPrice: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICartItems extends IProduct {
  quantity: number;
}

export interface ICategories {
  categoryName: string;
  categoryId: number;
}

export interface ICategoriesWithProducts extends ICategories {
  products: string[];
}

export interface ISelectedCategoryAndProduct {
  groupName: string;
  product: string;
  categoryId?: number | null;
}

export interface ICreateProductReview {
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  email: string;
  customerName: string;
}

export interface IReviewShopView extends ICreateProductReview {
  id: number;
  createdAt: string;
  isShow: boolean;
  productName: string;
  productSku: string;
}
