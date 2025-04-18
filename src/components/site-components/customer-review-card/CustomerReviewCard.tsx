"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  Rating,
  Skeleton,
} from "@mui/material";
import { fetchProductReviewsByProductId } from "@/services/ProductManagement/ProductsService";
import { ICreateProductReview } from "@/models/IProduct";

export interface ReviewProps {
  productId: number;
  refreshReviews: boolean;
}

const CustomerReviewCard: React.FC<ReviewProps> = ({
  productId,
  refreshReviews,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ICreateProductReview[]>([]);

  const getReviews = useCallback(async () => {
    if (!productId) return;
    try {
      setLoading(true);
      const res = await fetchProductReviewsByProductId(productId);
      if (res) setReviews(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    getReviews();
  }, [getReviews, refreshReviews]);

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2}>
        Customer Reviews
      </Typography>

      {loading ? (
        <Stack spacing={2}>
          {[...Array(2)].map((_, idx) => (
            <Card key={idx} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Skeleton width="30%" />
                    <Skeleton width="50%" />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : reviews.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No reviews yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {reviews.map((review, idx) => (
            <Card key={idx} variant="outlined" sx={{ border: "none" }}>
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Avatar>
                    {review.customerName?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600}>
                      {review.customerName}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                    {review.comment && (
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {review.comment}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default CustomerReviewCard;
