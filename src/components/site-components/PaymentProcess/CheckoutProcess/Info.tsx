import useUser from "@/customHooks/useUser";
import {
  ICartProducts,
  ICartSummayItems,
} from "@/models/OrderManagement/IAddOrUpdateCartPayload";
import {
  updateCartItem,
  deleteCartItem,
} from "@/services/OrderService/OrderService";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { useCartStore } from "@/store/site-store/useCartStore";
import {
  Typography,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  CircularProgress,
  Divider,
} from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDiscount } from "@/services/UserManagementService/UsersService";
import { Controller, useFormContext } from "react-hook-form";
import { ICheckoutSessionFormValues } from "./CheckoutBeta/CheckoutPageBeta";
import showErrorToast from "@/components/showErrorToast";
import { DeliveryCharges } from "@/data/delivery-charges";

interface IPageProps {
  cartProductsWithSummary: ICartSummayItems;
}

const Info: NextPage<IPageProps> = (props) => {
  const { cartItems, summary } = props.cartProductsWithSummary;
  const fetchCart = useCartStore((state) => state.fetchCart);
  const userId = useUser()?.userId;
  const sessionId = getSessionStorageItem("sessionId") as string;
  const [loading, setLoading] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ICheckoutSessionFormValues>();

  const code = watch("discountCode");
  const discountValue = getValues("discountValue");
  const deliveryCharge = getValues("deliveryCharge");
  const state = getValues("shippingAddress.state");

  const [localQuantities, setLocalQuantities] = useState<{
    [key: number]: number;
  }>({});
  const debounceTimers = useRef<{ [key: number]: NodeJS.Timeout }>({});

  useEffect(() => {
    const subtotal = Number(summary?.totalPrice || 0);
    const discount = Number(discountValue || 0);
    const freeDeliveryThreshold = Number(
      DeliveryCharges.freeDeliveryAboveValue || 0
    );

    let delivery = 0;

    if (subtotal > freeDeliveryThreshold) {
      delivery = 0;
    } else if (state) {
      switch (state) {
        case "Tamil Nadu":
        case "Kerala":
        case "Karnataka":
        case "Andhra Pradesh":
        case "Telangana":
          delivery = Number(DeliveryCharges.tamilNadu);
          break;
        default:
          delivery = Number(DeliveryCharges.otherState);
          break;
      }
    }

    setValue("deliveryCharge", delivery, { shouldValidate: true });

    const total = subtotal + delivery - discount;
    setTotalAmount(Math.max(0, total));
  }, [summary, discountValue, setValue, getValues, state]);

  // Initialize localQuantities once
  useEffect(() => {
    const initialQuantities: { [key: number]: number } = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = item.quantity;
    });
    setLocalQuantities(initialQuantities);
  }, [cartItems]);

  const updateQuantityApi = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartItem({ cartItemId, quantity });
      fetchCart(userId || sessionId);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (
    product: ICartProducts,
    action: "increment" | "decrement"
  ) => {
    setLoading(true);
    const productId = product.id;
    const currentQty = localQuantities[productId] ?? product.quantity;
    const newQty =
      action === "increment" ? currentQty + 1 : Math.max(1, currentQty - 1);

    // Instant UI update
    setLocalQuantities((prev) => ({
      ...prev,
      [productId]: newQty,
    }));

    // Debounce API call
    clearTimeout(debounceTimers.current[productId]);
    debounceTimers.current[productId] = setTimeout(() => {
      updateQuantityApi(productId, newQty);
    }, 800);
  };

  const onDelete = async (cartItemId: number) => {
    try {
      const response = await deleteCartItem(cartItemId);
      if (response) {
        toast.success("Deleted");
        fetchCart(userId || sessionId);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      setLoading(true);
      const res = await getDiscount({
        code,
        userId: userId || 0,
      });
      if (res.message === "Coupon is valid.") {
        setValue("discountValue", res.discount.value, {
          shouldValidate: true,
        });
      } else {
        setValue("discountValue", 0);
        setValue("discountCode", "");
      }
    } catch (err) {
      setValue("discountCode", "");
      setValue("discountValue", 0);
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {cartItems.map((item) => {
            const quantity = localQuantities[item.id] ?? item.quantity;
            return (
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: "10px",
                  mb: "10px",
                }}
                key={item.id}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80, objectFit: "cover" }}
                  image={item.product.imageUrl}
                  alt="Combo"
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: {
                        md: "flex-end",
                        sm: "flex-end",
                        xs: "baseline",
                      },
                      flexDirection: { xs: "column", sm: " row", md: "row" },
                      rowGap: { xs: "10px" },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="subtitle1">
                        {item.product.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.product.weight}g
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        Rs.{item.price}
                      </Typography>
                    </Box>
                    <Box>
                      <ButtonGroup variant="outlined" size="small">
                        <Button
                          disabled={quantity <= 1 || loading}
                          onClick={() =>
                            handleQuantityChange(item, "decrement")
                          }
                        >
                          -
                        </Button>
                        <Button>{quantity}</Button>
                        <Button
                          disabled={
                            quantity >= item.product.productQuantity || loading
                          }
                          onClick={() =>
                            handleQuantityChange(item, "increment")
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                      <IconButton
                        sx={{ ml: "20px" }}
                        aria-label="delete"
                        size="small"
                        onClick={() => onDelete(item.id)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="discountCode"
            control={control}
            render={({ field }) => (
              <TextField
                label="Discount code"
                size="small"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.discountCode}
                helperText={errors.discountCode?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            disabled={loading || !code}
            fullWidth
            onClick={() => handleApplyCoupon()}
          >
            Apply
          </Button>
        </Grid>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <CircularProgress size="30px" />{" "}
          </Box>
        ) : (
          <>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>Rs.{summary.totalPrice}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography>Delivery Charge</Typography>
                <Typography>Rs.{deliveryCharge.toFixed(2) || 0}</Typography>
              </Box>
            </Grid>

            {Number(discountValue) > 0 && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Discount</Typography>
                  <Typography>Rs.{Number(discountValue).toFixed(2)}</Typography>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider />
              <Box
                display="flex"
                justifyContent="space-between"
                fontWeight="bold"
              >
                <Typography>Total</Typography>
                <Typography>
                  INR Rs.
                  {totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Info;
