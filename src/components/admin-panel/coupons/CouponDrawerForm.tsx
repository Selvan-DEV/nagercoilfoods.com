"use client";

import {
  Box,
  Button,
  Drawer,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  createCoupon,
  updateCoupon,
  getCouponById,
} from "@/services/ShopManagement/ShopManagement";
import showErrorToast from "@/components/showErrorToast";
import { toast } from "react-toastify";
import { formatDateForInput } from "@/components/dateInputFormatter";

interface Props {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  couponId?: number | null;
  getCoupons: (refresh: boolean) => void;
}

// Yup schema
const couponSchema = yup.object().shape({
  code: yup.string().required("Code is required"),
  value: yup
    .number()
    .typeError("Value must be a number")
    .positive("Value must be greater than 0")
    .required("Value is required"),
  status: yup
    .string()
    .oneOf(["active", "inactive"])
    .required("Status is required"),
  expiryDate: yup
    .string()
    .required("Expiry date is required")
    .test("is-future", "Expiry date must be in the future", (value) => {
      if (!value) return false;
      return new Date(value).getTime() > Date.now();
    }),
});

export default function CouponDrawerForm({
  open,
  onClose,
  isEdit,
  couponId,
  getCoupons,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{
    code: string;
    value: number;
    status: "active" | "inactive";
    expiryDate: string;
  }>({
    resolver: yupResolver(couponSchema),
    defaultValues: {
      code: "",
      value: 0,
      status: "active",
      expiryDate: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (isEdit && couponId) {
        data.id = couponId;
        await updateCoupon(data);
        toast.success("Coupon updated successfully");
      } else {
        await createCoupon(data);
        toast.success("Coupon created successfully");
      }
      getCoupons(true);
      onClose();
    } catch (error) {
      showErrorToast(error);
    }
  };

  const loadCouponData = async () => {
    if (isEdit && couponId) {
      try {
        const data = await getCouponById(couponId);
        if (data) {
          reset({
            code: data.code || "",
            value: data.value || 0,
            expiryDate: formatDateForInput(data.expiryDate) || "",
            status: data.isActive === 1 ? "active" : "inactive",
          });
        }
      } catch (error) {
        showErrorToast(error);
      }
    } else {
      reset({
        code: "",
        value: 0,
        status: "active",
        expiryDate: "",
      });
    }
  };

  useEffect(() => {
    if (open) {
      loadCouponData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, couponId]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Typography variant="h6" mb={2}>
          {isEdit ? "Edit Coupon" : "Add Coupon"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Code"
                    size="small"
                    fullWidth
                    error={!!errors.code}
                    helperText={errors.code?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Value"
                    size="small"
                    type="number"
                    fullWidth
                    error={!!errors.value}
                    helperText={errors.value?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="expiryDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expiry Date"
                    type="datetime-local"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Status"
                    select
                    size="small"
                    fullWidth
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={"10px"}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {isEdit ? "Update" : "Create"}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}
