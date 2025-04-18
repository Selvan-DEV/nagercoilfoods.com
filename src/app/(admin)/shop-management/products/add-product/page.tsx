import ProductForm from "@/components/admin-panel/AddProduct";
import { Box } from "@mui/material";
import React from "react";

export default function AddProduct() {
  return (
    <Box sx={{ margin: "25px" }}>
      <ProductForm />
    </Box>
  );
}
