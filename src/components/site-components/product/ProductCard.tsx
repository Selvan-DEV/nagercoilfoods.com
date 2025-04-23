import React, { useState } from "react";
import { Box, Card, CardMedia, Typography, Chip } from "@mui/material";
import styled from "@emotion/styled";
import StarIcon from "@mui/icons-material/Star";
import { useCartStore } from "@/store/site-store/useCartStore";
import useUser from "@/customHooks/useUser";
import { IProduct } from "@/models/IProduct";
import { IAddOrUpdateCartPayload } from "@/models/OrderManagement/IAddOrUpdateCartPayload";
import Rupee from "@/shared/Rupee/Rupee";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import LoadingButton from "@mui/lab/LoadingButton";

const StyledTypography = styled(Typography)`
  transition: color 0.3s ease-in-out;

  &:hover {
    text-decoration: underline;
    color: "#BF8C09";
  }
`;

const ProductCardBeta = (props: {
  product: IProduct;
  onClick: (product: IProduct) => void;
  fetchProducts?: () => void;
}) => {
  const { product, onClick, fetchProducts } = props;
  const userId = useUser()?.userId;
  const addToCart = useCartStore((state) => state.addToCart);
  const [loading, setLoading] = useState<boolean>(false);

  const onAddToCart = async (product: IProduct) => {
    setLoading(true);
    const sessionId = getSessionStorageItem("sessionId");
    const payload = {
      productId: product.id,
      sessionId: userId ? null : sessionId,
      userId: userId ?? null,
      quantity: 1,
    } as IAddOrUpdateCartPayload;
    addToCart(payload);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: 300,
          padding: 2,
          textAlign: "center",
        }}
      >
        {product.averageRating ? (
          <Box sx={{ textAlign: "right", height: "25px" }}>
            <Chip
              color="primary"
              icon={<StarIcon sx={{ color: "white" }} />}
              label={`${Math.round(product.averageRating)}`}
              sx={{
                fontWeight: "bold",
                borderRadius: 1,
              }}
              size="small"
            />
          </Box>
        ) : (
          <Box sx={{ textAlign: "right", height: "25px" }}></Box>
        )}
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt="Natural soybean"
          sx={{ objectFit: "contain" }}
        />
        <StyledTypography
          onClick={() => onClick(product)}
          variant="h6"
          sx={{
            mt: 2,
            fontWeight: "bold",
            height: "50px",
            color: "#333333",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          {product.productName}
        </StyledTypography>
        {Number(product.offerPrice) > 0 ? (
          <Box>
            <Rupee rupee={product.price} isLineThrough={true} />
            <Rupee rupee={Number(product.price) - Number(product.offerPrice)} />
          </Box>
        ) : (
          <Box>
            <Rupee rupee={product.price} />
          </Box>
        )}

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <LoadingButton
            variant="outlined"
            fullWidth
            loading={loading}
            onClick={() => onAddToCart(product)}
          >
            {loading ? "...loading" : "ADD TO CART"}
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductCardBeta;
