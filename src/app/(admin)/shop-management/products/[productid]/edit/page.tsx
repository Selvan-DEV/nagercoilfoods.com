import ProductForm from "@/components/admin-panel/AddProduct";
import { Box } from "@mui/material";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ productid: string }>;
}) {
  const { productid } = await params;

  return (
    <Box sx={{ marginTop: "20px", margin: "25px", minHeight: "100vh" }}>
      {productid && <ProductForm productId={Number(productid)} />}
    </Box>
  );
}
