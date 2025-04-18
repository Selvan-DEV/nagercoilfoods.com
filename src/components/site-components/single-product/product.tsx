"use client";

import { NextPage } from "next";
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useCartStore } from "@/store/site-store/useCartStore";
import useUser from "@/customHooks/useUser";
import { IProduct } from "@/models/IProduct";
import { IAddOrUpdateCartPayload } from "@/models/OrderManagement/IAddOrUpdateCartPayload";
import ProductDetailsSideSection from "@/shared/ProductDetailsSideSection/ProductDetailsSideSection";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import SingleProductView from "@/shared/SingleProduct/SingleProductView";
import CustomerReviewCard from "@/components/site-components/customer-review-card/CustomerReviewCard";
import { useState } from "react";

interface ProductPageProps {
  product: IProduct;
}

const ProductViewPage: NextPage<ProductPageProps> = (props) => {
  const { product } = props;
  const user = useUser();
  const addToCart = useCartStore((state) => state.addToCart);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [refreshReviews, setRefreshReviews] = useState(false);

  const triggerRefresh = (isRefresh: boolean) => {
    setRefreshReviews((prev) => !prev);
  };

  const addOrUpdateProductToCart = async (product: IProduct) => {
    const sessionId = getSessionStorageItem("sessionId");

    const payload = {
      productId: product.id,
      sessionId: user.userId || sessionId,
      quantity: product.selectedQuantity,
      variantId: product.variantId,
    } as IAddOrUpdateCartPayload;

    addToCart(payload);
  };

  return (
    <>
      {product && (
        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            spacing={2}
            sx={{ padding: 2, marginTop: 9 }}
          >
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <SingleProductView product={product} />

              {!isMobile && (
                <CustomerReviewCard
                  productId={product.id || 0}
                  refreshReviews={refreshReviews}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <ProductDetailsSideSection
                product={product}
                addOrUpdateProductToCart={addOrUpdateProductToCart}
                onReviewPosted={triggerRefresh}
              />
            </Grid>
          </Grid>
          {isMobile && (
            <Grid container direction="column">
              <Grid direction="row" display="flex">
                <CustomerReviewCard
                  productId={product.id || 0}
                  refreshReviews={refreshReviews}
                />
              </Grid>
            </Grid>
          )}
        </Container>
      )}
    </>
  );
};

export default ProductViewPage;
