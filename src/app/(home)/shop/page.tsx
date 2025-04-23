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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, product, priceRange, categories]);

  const fetchProducts = async () => {
    const decodedValue = decodeURIComponent(String(category));
    const groupName = String(decodedValue).split("_").join(" ");

    const payload = {
      categoryId: categories.find(
        (x) => x.categoryName.toLowerCase() === groupName
      )?.categoryId,
      search: product,
      // minPrice:
      //   (priceRange as number[]).length > 0 ? (priceRange as number[])[0] : 0,
      // maxPrice:
      //   (priceRange as number[]).length > 0 ? (priceRange as number[])[1] : 0,
    };

    try {
      setLoading(true);
      const data = await getProducts(payload);
      setProducts(data);
    } catch (error) {
      showErrorToast(error as AxiosError<ErrorResponse>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: "170px" }}>{/* <CustomizedInputBase /> */}</Box>
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
