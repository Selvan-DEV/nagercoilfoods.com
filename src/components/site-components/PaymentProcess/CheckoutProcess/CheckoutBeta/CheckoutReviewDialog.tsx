import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Paper,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import {
  ICartSummayItems,
  ICheckOutSessionAddress,
  ICheckoutSessionInfo,
} from "@/models/OrderManagement/IAddOrUpdateCartPayload";
import CheckOutButton from "@/components/site-components/checkout-button/CheckoutButton";

// Types
interface Address {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
}

interface Summary {
  totalPrice: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  reviewValues: ICheckoutSessionInfo;
  cartProductsWithSummary: ICartSummayItems;
}

const CheckoutReviewDialog: React.FC<Props> = ({
  open,
  onClose,
  reviewValues,
  cartProductsWithSummary,
}) => {
  return (
    <Dialog open={open} maxWidth="md" fullWidth disableEscapeKeyDown>
      <DialogTitle>Confirm Your Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={4}>
          {/* Addresses */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <AddressCard address={reviewValues.shippingAddress} />

            {reviewValues.billingAddress && (
              <>
                <Typography variant="h6" gutterBottom mt={4}>
                  Billing Address
                </Typography>
                <AddressCard address={reviewValues.billingAddress} />
              </>
            )}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <SummaryRow
                  label="Subtotal"
                  value={`₹${Number(reviewValues.totalPrice).toFixed(2)}`}
                />
                <SummaryRow
                  label="Discount"
                  value={`- ₹${Number(reviewValues.discountValue).toFixed(2)}`}
                />
                <SummaryRow
                  label="Delivery"
                  value={
                    Number(reviewValues.deliveryCharge) === 0
                      ? "Free"
                      : `₹${Number(reviewValues.deliveryCharge).toFixed(2)}`
                  }
                />
                <Divider />
                <SummaryRow
                  label="Total"
                  value={`₹${Number(reviewValues.finalAmount).toFixed(2)}`}
                  bold
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <CheckOutButton
          checkoutSessionData={reviewValues}
          cartState={cartProductsWithSummary}
          onClose={onClose}
        />
      </DialogActions>
    </Dialog>
  );
};

// Address Card
const AddressCard: React.FC<{ address: ICheckOutSessionAddress }> = ({
  address,
}) => (
  <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
    <Typography fontWeight="bold">
      {address.firstName} {address.lastName}
    </Typography>
    <Typography>
      {address.address}, {address.landmark}
    </Typography>
    <Typography>
      {address.city}, {address.state} - {address.pincode}
    </Typography>
    <Typography>Phone: {address.phoneNumber}</Typography>
  </Paper>
);

// Summary Row
const SummaryRow: React.FC<{
  label: string;
  value: string;
  bold?: boolean;
}> = ({ label, value, bold = false }) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography fontWeight={bold ? "bold" : "normal"}>{label}</Typography>
    <Typography fontWeight={bold ? "bold" : "normal"}>{value}</Typography>
  </Stack>
);

export default CheckoutReviewDialog;
