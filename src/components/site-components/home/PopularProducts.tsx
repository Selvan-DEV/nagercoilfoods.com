"use client";

import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ProductCardBeta from "../product/ProductCard";
import CustomButton from "../custom-button/CustomButton";
import { useRouter } from "next/navigation";
import { IProduct } from "@/models/IProduct";
import { getPopularProducts } from "@/services/ProductManagement/ProductsService";

export default function PopularProducts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  const getRecentOrders = useCallback(async () => {
    try {
      setLoading(true);
      const products = await getPopularProducts();
      setLoading(false);
      if (products && products.length) {
        setProducts(products.slice(0, 4));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRecentOrders();
  }, [getRecentOrders]);

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
        {products.map((product) => (
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
