"use client";

import { useForm, Controller } from "react-hook-form";
import { Rating, TextField, Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createReview } from "@/services/ProductManagement/ProductsService";
import { ICreateProductReview } from "@/models/IProduct";
import { toast } from "react-toastify";
import showErrorToast from "@/components/showErrorToast";
import useUser from "@/customHooks/useUser";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

interface ReviewFormData {
  email: string;
  rating: number;
  comment: string;
  customerName: string;
}

const reviewSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").default(""),
  customerName: yup.string().required("Name is required"),
  rating: yup
    .number()
    .min(1, "Please provide a rating")
    .required("Rating is required"),
  comment: yup.string().default(""),
});

export default function ReviewForm(props: {
  productId: number;
  onReviewPosted: (isRefresh: boolean) => void;
}) {
  const { productId, onReviewPosted } = props;
  const userId = useUser().userId;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      email: "",
      rating: 0,
      comment: "",
      customerName: "",
    },
  });

  const [loading, setLoding] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    const formData = data as ReviewFormData;
    setLoding(true);
    try {
      const payload = {
        productId,
        rating: formData.rating || 0,
        email: formData.email,
        comment: formData.comment,
        userId: userId || 0,
        customerName: formData.customerName,
      } as unknown as ICreateProductReview;

      const response = await createReview(payload);
      if (response) {
        onReviewPosted(true);
        toast.success("Thank you for your valuable feedback");
        reset();
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoding(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400 }}
    >
      <Typography variant="h6" gutterBottom>
        We&apos;d love to hear your feedback
      </Typography>

      <Controller
        name="customerName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            required
            size="small"
            label="Name"
            variant="outlined"
            margin="normal"
            error={!!errors.customerName}
            helperText={errors.customerName?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <Box mt={2} mb={1}>
            <Typography gutterBottom>Rating *</Typography>
            <Rating
              {...field}
              value={field.value || 0}
              onChange={(_, value) => field.onChange(value)}
            />
            {errors.rating && (
              <Typography variant="caption" color="error">
                {errors.rating.message}
              </Typography>
            )}
          </Box>
        )}
      />

      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Comments"
            size="small"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
          />
        )}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        loading={loading}
        loadingPosition="start"
        sx={{ mt: 2 }}
      >
        Submit Review
      </LoadingButton>
    </Box>
  );
}
