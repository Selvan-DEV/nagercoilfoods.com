import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Rupee from "../Rupee/Rupee";
import { IProduct } from "@/models/IProduct";
import ReviewForm from "@/components/site-components/review-form/ReviewForm";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";

export default function ProductDetailsSideSection(props: {
  product: IProduct;
  addOrUpdateProductToCart: (cartPayload: IProduct) => void;
  onReviewPosted: (isRefresh: boolean) => void;
}) {
  const router = useRouter();
  const { product, addOrUpdateProductToCart, onReviewPosted } = props;
  const [variantId, setVariantId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [buyNowLoading, setBuyNowLoading] = useState<boolean>(false);

  const addToCart = (isBuyNow: boolean): void => {
    isBuyNow ? setBuyNowLoading(true) : setLoading(true);
    const payload = {
      ...product,
      selectedQuantity: quantity,
      variantId,
    };
    addOrUpdateProductToCart(payload);

    setTimeout(() => {
      setBuyNowLoading(false);
      setLoading(false);
      if (isBuyNow) {
        router.push("/checkout");
      }
    }, 3000);
  };

  const handleWeightChange = (
    _: any,
    newWeight: React.SetStateAction<number> | null
  ) => {
    if (newWeight !== null) setVariantId(newWeight);
  };

  const handleQuantityChange = (type: string) => {
    setQuantity((prev) => Math.max(1, type === "inc" ? prev + 1 : prev - 1));
  };

  return (
    <Box maxWidth={400} p={3}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {product.productName}
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textDecoration: "line-through" }}
        ></Typography>
        <Rupee rupee={product.price} isLineThrough={true} />
        <Rupee rupee={product.price - Number(product.offerPrice)} />
        <Chip label="Sale" color="primary" />
      </Box>

      <Typography variant="body2" color="text.secondary" mt={1}>
        <u>Shipping</u> calculated at checkout.
      </Typography>

      {/* Weight Selection */}
      {product && product.variants.length ? (
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Bundle
          </Typography>
          <ToggleButtonGroup
            value={variantId}
            exclusive
            onChange={handleWeightChange}
            sx={{ mb: 2 }}
          >
            {product &&
              product.variants.length &&
              product.variants.map((variant) => (
                <ToggleButton
                  value={variant.variantsId || 0}
                  key={variant.variantsId}
                >
                  {variant.variantName}
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </Box>
      ) : (
        <Box></Box>
      )}

      {/* Quantity Selector */}
      <Box mt={3}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Quantity
        </Typography>
        <Box display="flex" alignItems="center" width={120}>
          <IconButton
            onClick={() => handleQuantityChange("dec")}
            disabled={quantity <= 1}
          >
            <Remove />
          </IconButton>
          <TextField
            value={quantity}
            size="small"
            inputProps={{ style: { textAlign: "center" } }}
            sx={{ width: 50 }}
          />
          <IconButton
            onClick={() => handleQuantityChange("inc")}
            disabled={quantity === product.productQuantity}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>

      {/* Buttons */}
      <Box mt={3} display="flex" flexDirection="column" gap={2}>
        <LoadingButton
          variant="outlined"
          fullWidth
          disabled={loading}
          loading={loading}
          onClick={() => addToCart(false)}
        >
          {loading ? "...loading" : "Add to cart"}
        </LoadingButton>
        <LoadingButton
          variant="contained"
          fullWidth
          disabled={buyNowLoading}
          loading={buyNowLoading}
          color="primary"
          onClick={() => addToCart(true)}
        >
          {buyNowLoading ? "...loading" : "Buy it now"}
        </LoadingButton>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: "25px" }}
      >
        {product.description}
      </Typography>

      {product.ingredients ? (
        <Box sx={{ marginTop: "10px" }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Ingredients
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.ingredients}
          </Typography>
        </Box>
      ) : (
        <Box></Box>
      )}

      <Divider sx={{ my: 1 }} />

      <ReviewForm productId={product.id || 0} onReviewPosted={onReviewPosted} />
    </Box>
  );
}
