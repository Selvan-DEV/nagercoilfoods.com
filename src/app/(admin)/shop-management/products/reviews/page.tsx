"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Avatar,
  Rating,
  CircularProgress,
  Divider,
} from "@mui/material";
import SpinnerComponent from "@/components/site-components/page-loader/SpinnerComponent";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { ILoginResponse } from "@/models/UserManagement/IUserData";
import { IReviewShopView } from "@/models/IProduct";
import {
  getAllReviewsByShopId,
  updateReviewStatus,
} from "@/services/ShopManagement/ShopManagement";
import DateTimeComponent from "@/shared/StandaredDateTime/DateTime";
import { toast } from "react-toastify";

export default function ReviewPage() {
  const shopData = getSessionStorageItem("adminData") as ILoginResponse;
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<IReviewShopView[]>([]);
  const [shopId, setShopId] = useState<number>(0);
  const [toggleLoadingId, setToggleLoadingId] = useState<number | null>(null);

  useEffect(() => {
    if (shopData?.user?.shopId) {
      setShopId(shopData.user.shopId);
    }
  }, [shopData]);

  const getRecentReviews = useCallback(async () => {
    if (!shopId) return;
    try {
      setLoading(true);
      const result = await getAllReviewsByShopId();
      setReviews(result || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    getRecentReviews();
  }, [getRecentReviews]);

  const handleToggleVisibility = async (
    reviewId: number,
    currentStatus: boolean
  ) => {
    setToggleLoadingId(reviewId);
    try {
      const updated = await updateReviewStatus(reviewId, !currentStatus);
      if (updated) {
        setReviews((prev) =>
          prev.map((rev) =>
            rev.id === reviewId ? { ...rev, isShow: !currentStatus } : rev
          )
        );
        toast.success("Success");
      }
    } catch (error) {
      console.error("Toggle error:", error);
    } finally {
      setToggleLoadingId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid item xs={12} md={6} lg={4} key={review.id}>
              <Card>
                <CardContent>
                  <Box>
                    <Typography>
                      Product: {review.productName || "N/A"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      SKU: {review.productSku || "N/A"}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar>{review.customerName?.[0] || "U"}</Avatar>
                    <Box>
                      <Typography fontWeight="bold">
                        {review.customerName || "Unknown User"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <DateTimeComponent dateTime={review.createdAt || ""} />
                      </Typography>
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Rating value={review.rating || 0} readOnly />
                    <Typography mt={1}>{review.comment}</Typography>
                  </Box>

                  <Box mt={2}>
                    <FormControlLabel
                      control={
                        toggleLoadingId === review.id ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Switch
                            checked={review.isShow}
                            onChange={() =>
                              handleToggleVisibility(
                                review.id || 0,
                                review.isShow
                              )
                            }
                            color="primary"
                          />
                        )
                      }
                      label="Visible on Website"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
