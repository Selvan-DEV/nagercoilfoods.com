"use client";

import ProductSearchResults from "@/components/site-components/Web/ProductManagement/SearchResults/ProductSearchResults";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { IProduct, ICategoriesWithProducts } from "@/models/IProduct";
import {
  getCategoriesWithProducts,
  getProducts,
} from "@/services/ProductManagement/ProductsService";
import { useMediaQuery, Container, Box, Grid, useTheme } from "@mui/material";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategoriesWithProducts[]>([]);
  const [priceRange, setPriceRange] = useState<number[] | number>([1, 1000]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const params = useParams();
  const { category, product } = params;

  const getCategories = useCallback(async () => {
    try {
      const fetchedCategories = await getCategoriesWithProducts();
      if (fetchedCategories) {
        setCategories(fetchedCategories);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts(null);
      setProducts(data);
    } catch (error) {
      showErrorToast(error as AxiosError<ErrorResponse>);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container>
      <Box>{/* <CustomizedInputBase /> */}</Box>
      <Grid
        container
        md={12}
        sx={{
          marginTop: 5,
          justifyContent: isMobile ? "center" : "",
          gap: "20px",
        }}
      >
        {/* Price Filter */}
        {/* <ProductSearchFilters
          categories={categories}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
        /> */}

        {/* Products Grid */}
        <ProductSearchResults
          fetchProducts={fetchProducts}
          products={products}
          loading={loading}
        />
      </Grid>
    </Container>
  );
}
