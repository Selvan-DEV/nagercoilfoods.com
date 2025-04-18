import useUser from "@/customHooks/useUser";
import { ICreateProductReview } from "@/models/IProduct";
import { createReview } from "@/services/ProductManagement/ProductsService";
import { Rating } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function Ratings(props: {
  productId: number;
  fetchProducts?: () => void;
}) {
  const { productId, fetchProducts } = props;
  const user = useUser();

  const [ratingValue, setRatingValue] = useState<number | null>(null);

  const onRatingsChange = async (
    e: ChangeEvent<{}>,
    newValue: number | null
  ) => {
    if (!newValue) {
      return;
    }

    if (user && user.userId) {
      try {
        const payload = {
          productId: productId,
          userId: user.userId,
          rating: newValue,
          comment: "",
        } as ICreateProductReview;
        const response = await createReview(payload);
        if (response) {
          toast.success("Thanks for your valuable rating");
          if (fetchProducts) {
            fetchProducts();
          }
        }
      } catch (error) {}
    }
    setRatingValue(newValue);
  };

  return (
    <Rating
      name="read-only"
      value={ratingValue}
      sx={{ mt: 2 }}
      onChange={onRatingsChange}
    />
  );
}
