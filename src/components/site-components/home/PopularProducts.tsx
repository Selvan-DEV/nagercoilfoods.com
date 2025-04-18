import { Box, Typography } from "@mui/material";
import React from "react";
import ProductCardBeta from "../product/ProductCard";
import CustomButton from "../custom-button/CustomButton";
import { useRouter } from "next/navigation";
import { IProduct } from "@/models/IProduct";

const MockPopularProducts = [
  {
    id: 46,
    sku: "NPSBP-1",
    brand: "Nilas Snacks",
    brandId: 0,
    createdAt: "2025-04-08T11:08:57.000Z",
    description:
      "Nagercoil Banana Chips - the best snack you can get from South India ! Made with the freshest Nagercoil Nendran Bananas, these chips are flavoured with Black pepper from Kanyakumari for an extra kick. With 4 delicious flavors to choose from – Original, Extra Spicy, Classic Salt, and Peri Peri – you can get your snack fix without compromising on flavour. Get your hands on a bag of Spicy Banana Chips today and experience the unique taste of Nagercoil!",
    tags: null,
    warrantyInformation: null,
    imageUrl: "/images/Products/Banana-Slice.jpg",
    price: "200.00",
    discountPrice: null,
    productName: "Nagercoil Nendran Banana Chips",
    metaTitle: "Nagercoil Nendran Banana Chips",
    metaDescription:
      "Nagercoil Banana Chips - the best snack you can get from South India ! Made with the freshest Nagercoil Nendran Bananas, these chips are flavoured with Black pepper from Kanyakumari for an extra kick. With 4 delicious flavors to choose from – Original, Extra Spicy, Classic Salt, and Peri Peri – you can get your snack fix without compromising on flavour. Get your hands on a bag of Spicy Banana Chips today and experience the unique taste of Nagercoil!",
    productQuantity: 10,
    stockStatus: "in_stock",
    visibility: "",
    weight: "250.00",
    length: null,
    width: null,
    height: null,
    rating: null,
    reviewsCount: null,
    averageReviewRating: null,
    uniqueName: "nagercoil-nendran-banana-chips",
    categoryId: 51,
    shopId: 1,
    supplierId: null,
    taxClass: null,
    shippingClass: null,
    ingredients:
      "Nendram Plantains, Salt, Black Pepper, Chili Powder, Asafoetida Powder, Cumin, Refined Sunflower oil.",
    offerPrice: "10.00",
    offerStartDate: "2025-04-10T15:00:00.000Z",
    offerEndDate: "2025-04-29T15:00:00.000Z",
    updatedAt: "2025-04-08T12:03:40.000Z",
    categoryName: "Snacks",
  },
  {
    id: 47,
    sku: "COBCESP-1",
    brand: "Nilas Snacks",
    brandId: 1,
    createdAt: "2025-04-08T13:22:14.000Z",
    description:
      "Enjoy our new Coconut Oil Banana Chips - Extra Spicy Pepper! Made in the authentic Nagercoil style, these chips are cooked in cold pressed coconut oil for a unique and flavorful crunch. Made with Nendran bananas, these chips are a tasty and nutritious alternative to traditional snacks. Experience the perfect combination of heat and spice in every bite!",
    tags: null,
    warrantyInformation: null,
    imageUrl: "/images/Products/Banana-Slice.jpg",
    price: "200.00",
    discountPrice: null,
    productName: "Coconut Oil Banana Chips - Extra Spicy Pepper",
    metaTitle: "Coconut Oil Banana Chips - Extra Spicy Pepper",
    metaDescription:
      "Enjoy our new Coconut Oil Banana Chips - Extra Spicy Pepper! Made in the authentic Nagercoil style, these chips are cooked in cold pressed coconut oil for a unique and flavorful crunch. Made with Nendran bananas, these chips are a tasty and nutritious alternative to traditional snacks. Experience the perfect combination of heat and spice in every bite!",
    productQuantity: 10,
    stockStatus: "in_stock",
    visibility: "",
    weight: "200.00",
    length: null,
    width: null,
    height: null,
    rating: null,
    reviewsCount: null,
    averageReviewRating: null,
    uniqueName: "cold-pressed-coconut-oil-spicy-nagercoil-banana-chips",
    categoryId: 51,
    shopId: 1,
    supplierId: null,
    taxClass: null,
    shippingClass: null,
    ingredients: "",
    offerPrice: "10.00",
    offerStartDate: null,
    offerEndDate: null,
    updatedAt: null,
    categoryName: "Snacks",
  },
  {
    id: 48,
    sku: "COBCESP-1",
    brand: "Nilas Snacks",
    brandId: 1,
    createdAt: "2025-04-08T13:22:14.000Z",
    description:
      "Enjoy our new Coconut Oil Banana Chips - Extra Spicy Pepper! Made in the authentic Nagercoil style, these chips are cooked in cold pressed coconut oil for a unique and flavorful crunch. Made with Nendran bananas, these chips are a tasty and nutritious alternative to traditional snacks. Experience the perfect combination of heat and spice in every bite!",
    tags: null,
    warrantyInformation: null,
    imageUrl: "/images/Products/Banana-Slice.jpg",
    price: "200.00",
    discountPrice: null,
    productName: "Coconut Oil Banana Chips - Extra Spicy Pepper",
    metaTitle: "Coconut Oil Banana Chips - Extra Spicy Pepper",
    metaDescription:
      "Enjoy our new Coconut Oil Banana Chips - Extra Spicy Pepper! Made in the authentic Nagercoil style, these chips are cooked in cold pressed coconut oil for a unique and flavorful crunch. Made with Nendran bananas, these chips are a tasty and nutritious alternative to traditional snacks. Experience the perfect combination of heat and spice in every bite!",
    productQuantity: 10,
    stockStatus: "in_stock",
    visibility: "",
    weight: "200.00",
    length: null,
    width: null,
    height: null,
    rating: null,
    reviewsCount: null,
    averageReviewRating: null,
    uniqueName: "cold-pressed-coconut-oil-spicy-nagercoil-banana-chips",
    categoryId: 51,
    shopId: 1,
    supplierId: null,
    taxClass: null,
    shippingClass: null,
    ingredients: "",
    offerPrice: "10.00",
    offerStartDate: null,
    offerEndDate: null,
    updatedAt: null,
    categoryName: "Snacks",
  },
  {
    id: 49,
    sku: "COBCESP-1",
    brand: "Nilas Snacks",
    brandId: 1,
    createdAt: "2025-04-08T13:22:14.000Z",
    description:
      "Enjoy our new Coconut Oil Banana Chips - Extra Spicy Pepper! Made in the authentic Nagercoil style, these chips are cooked in cold pressed coconut oil for a unique and flavorful crunch. Made with Nendran bananas, these chips are a tasty and nutritious alternative to traditional snacks. Experience the perfect combination of heat and spice in every bite!",
    tags: null,
    warrantyInformation: null,
    imageUrl: "/images/Products/Banana-Slice.jpg",
    price: "200.00",
    discountPrice: null,
    productName: "Coconut Oil Banana Chips - Extra Spicy Pepper",
    metaTitle: "Coconut Oil Banana Chips - Extra Spicy Pepper",
    metaDescription:
      "Enjoy our new Coconut Oil Banana Chips - Extra Spicy Pepper! Made in the authentic Nagercoil style, these chips are cooked in cold pressed coconut oil for a unique and flavorful crunch. Made with Nendran bananas, these chips are a tasty and nutritious alternative to traditional snacks. Experience the perfect combination of heat and spice in every bite!",
    productQuantity: 10,
    stockStatus: "in_stock",
    visibility: "",
    weight: "200.00",
    length: null,
    width: null,
    height: null,
    rating: null,
    reviewsCount: null,
    averageReviewRating: null,
    uniqueName: "cold-pressed-coconut-oil-spicy-nagercoil-banana-chips",
    categoryId: 51,
    shopId: 1,
    supplierId: null,
    taxClass: null,
    shippingClass: null,
    ingredients: "",
    offerPrice: "10.00",
    offerStartDate: null,
    offerEndDate: null,
    updatedAt: null,
    categoryName: "Snacks",
  },
  {
    id: 50,
    sku: "COBCESP-1",
    brand: "Nilas Snacks",
    brandId: 1,
    createdAt: "2025-04-08T13:22:14.000Z",
    description:
      "Enjoy our new Coconut Oil Banana Chips - Extra Spicy Pepper! Made in the authentic Nagercoil style, these chips are cooked in cold pressed coconut oil for a unique and flavorful crunch. Made with Nendran bananas, these chips are a tasty and nutritious alternative to traditional snacks. Experience the perfect combination of heat and spice in every bite!",
    tags: null,
    warrantyInformation: null,
    imageUrl: "/images/Products/Banana-Slice.jpg",
    price: "200.00",
    discountPrice: null,
    productName: "Coconut Oil Banana Chips - Extra Spicy Pepper",
    metaTitle: "Coconut Oil Banana Chips - Extra Spicy Pepper",
    metaDescription:
      "Enjoy our new Coconut Oil Banana Chips - Extra Spicy Pepper! Made in the authentic Nagercoil style, these chips are cooked in cold pressed coconut oil for a unique and flavorful crunch. Made with Nendran bananas, these chips are a tasty and nutritious alternative to traditional snacks. Experience the perfect combination of heat and spice in every bite!",
    productQuantity: 10,
    stockStatus: "in_stock",
    visibility: "",
    weight: "200.00",
    length: null,
    width: null,
    height: null,
    rating: null,
    reviewsCount: null,
    averageReviewRating: null,
    uniqueName: "cold-pressed-coconut-oil-spicy-nagercoil-banana-chips",
    categoryId: 51,
    shopId: 1,
    supplierId: null,
    taxClass: null,
    shippingClass: null,
    ingredients: "",
    offerPrice: "10.00",
    offerStartDate: null,
    offerEndDate: null,
    updatedAt: null,
    categoryName: "Snacks",
  },
] as unknown as IProduct[];

export default function PopularProducts() {
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: "#f4f4f4",
        padding: "50px 0 70px 0",
        marginTop: "50px",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={{ md: "row" }}
        marginBottom="50px"
      >
        <Typography variant="h5" component="div" gutterBottom>
          Popular Products
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={{ md: "row", xs: "column", sm: "column" }}
        gap={"10px"}
      >
        {MockPopularProducts.map((product) => (
          <ProductCardBeta
            key={product.id}
            product={product}
            onClick={() =>
              router.push(`/product-details/${product.uniqueName}`)
            }
          />
        ))}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"row"}
        marginTop="50px"
      >
        <CustomButton onClick={() => router.push("/shop")} />
      </Box>
    </Box>
  );
}
