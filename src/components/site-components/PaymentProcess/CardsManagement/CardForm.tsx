"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { NextPage } from "next";
import LoadingButton from "@mui/lab/LoadingButton";
import useUser from "@/customHooks/useUser";

const stripePubKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "";
const stripePromise = loadStripe(stripePubKey);

const initialValues = {
  name: "",
  email: "",
  phone: "",
};

const CardForm: NextPage<{ onClose: (isPaymentAdded: boolean) => void }> = (
  props
) => {
  const { onClose } = props;
  const stripe = useStripe();
  const userId = useUser().userId;
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik<{
    name: string;
    email: string;
    phone: string;
  }>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.number()
        .typeError("Phone number must be a number")
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    // Get a reference to the card element
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("Card Element not found");
      return;
    }

    // Create the payment method
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: formik.values.name,
        email: formik.values.email,
        phone: formik.values.phone,
      },
    });
    if (error) {
      setLoading(false);
      // Show error to your customer (e.g., insufficient funds)
      setErrorMessage(error.message || "Payment failed");
    } else {
      // Payment method creation was successful
      if (paymentMethod.id) {
        const payload = {
          id: paymentMethod.id,
          userId: userId || 0,
          email: formik.values.email,
        };
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Card Holder Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
      </Grid>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {errorMessage && <Typography variant="h6">{errorMessage}</Typography>}
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <LoadingButton
          type="button"
          loading={false}
          loadingPosition="start"
          variant="outlined"
          onClick={() => onClose(false)}
        >
          <span>Cancel</span>
        </LoadingButton>
        <LoadingButton
          type="submit"
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </form>
  );
};

interface IPageProps {
  open: boolean;
  onClose: (isPaymentAdded: boolean) => void;
}

const CardFormComponent: NextPage<IPageProps> = (props) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} maxWidth="sm" fullWidth disableEscapeKeyDown={true}>
      <DialogTitle>Add New Card</DialogTitle>
      <DialogContent>
        <Elements stripe={stripePromise}>
          <CardForm onClose={onClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default CardFormComponent;
