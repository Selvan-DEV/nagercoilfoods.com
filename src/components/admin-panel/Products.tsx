"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Grid,
  Button,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import Link from "next/link";
import { IProduct } from "@/models/IProduct";
import DateTimeComponent from "@/shared/StandaredDateTime/DateTime";

interface IPageProps {
  products: IProduct[];
}

const ProductTable: NextPage<IPageProps> = (props) => {
  const { products } = props;
  const router = useRouter();

  return (
    <Box sx={{ padding: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item xs={4} sm={4}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/shop-management/products/add-product")}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="customer table">
          <TableHead>
            <TableRow>
              <TableCell>#SKU</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price (Selling Price)</TableCell>
              <TableCell>Qty (R/T)</TableCell>
              <TableCell>Added Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href={`/shop-management/products/${product.id}/edit`}>
                    <Typography color="primary" sx={{ fontWeight: 500 }}>
                      #{product.sku}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell sx={{ maxWidth: 150 }}>
                  <Tooltip title={product.productName} arrow>
                    <Typography
                      noWrap
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {product.productName}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>{product.categoryId}</TableCell>
                <TableCell>
                  ₹{product.price}
                  <Typography
                    component="span"
                    sx={{
                      textDecoration: "line-through",
                      fontSize: 12,
                      marginLeft: 1,
                      color: "gray",
                    }}
                  >
                    {product.discountPrice ? `₹${product.price}` : ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  {product.productQuantity} / {product.productQuantity}
                </TableCell>
                <TableCell>
                  <DateTimeComponent dateTime={product.createdAt || ""} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
