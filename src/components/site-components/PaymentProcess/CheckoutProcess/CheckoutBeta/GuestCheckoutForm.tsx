"use client";

import { statesOfIndia } from "@/data/states-of-India";
import { IAddress } from "@/models/UserManagement/IUserData";
import AddressFormatter from "@/shared/AddressComponent/AddressComponent";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { ICheckoutSessionFormValues } from "./CheckoutPageBeta";
import { DeliveryCharges } from "@/data/delivery-charges";

const StyledSelect = styled(Select)`
  && {
    margin-top: 16px;
  }
`;

const states = statesOfIndia;

const GuestCheckoutForm = ({
  addresses,
}: {
  addresses: IAddress[];
  fetchingAddress: boolean;
}) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ICheckoutSessionFormValues>();

  const shippingAddressId = watch("shippingAddressId");
  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);

  const onAddressSelect = (addressId: number) => {
    if (addressId === shippingAddressId) {
      clearShippingAddressObject();
      return;
    }

    const address = addresses.find((a) => a.addressId === addressId);
    if (!address) return;

    setShippingAddressValuesToObject(address, addressId);
  };

  const setShippingAddressValuesToObject = (
    address: IAddress,
    addressId: number
  ): void => {
    setValue("shippingAddressId", addressId, {
      shouldValidate: true,
    });
    setValue("billingAddressId", addressId, {
      shouldValidate: true,
    });
    setValue("billingSameAsShipping", true, {
      shouldValidate: true,
    });
    setValue("shippingAddress.firstName", address.firstName, {
      shouldValidate: true,
    });
    setValue("shippingAddress.lastName", address.lastName, {
      shouldValidate: true,
    });
    setValue("shippingAddress.address", address.address, {
      shouldValidate: true,
    });
    setValue("shippingAddress.city", address.city, { shouldValidate: true });
    setValue("shippingAddress.state", address.state, { shouldValidate: true });
    const event = {
      target: { value: address.state },
    } as SelectChangeEvent<unknown>;
    onStateSelect(event);
    setValue("shippingAddress.pincode", String(address.pincode), {
      shouldValidate: true,
    });
    setValue("shippingAddress.phone", String(address.phoneNumber), {
      shouldValidate: true,
    });

    setSelectedAddressId(addressId);
  };

  const clearShippingAddressObject = (): void => {
    setValue("shippingAddressId", 0, {
      shouldValidate: true,
    });
    setValue("billingAddressId", 0, {
      shouldValidate: true,
    });
    setValue("shippingAddress.firstName", "", {
      shouldValidate: true,
    });
    setValue("shippingAddress.lastName", "", {
      shouldValidate: true,
    });
    setValue("shippingAddress.address", "", {
      shouldValidate: true,
    });
    setValue("shippingAddress.city", "", { shouldValidate: true });
    setValue("shippingAddress.state", "", { shouldValidate: true });
    setValue("deliveryCharge", 0, { shouldValidate: true });
    setValue("shippingAddress.pincode", String(""), {
      shouldValidate: true,
    });
    setValue("shippingAddress.phone", String(""), {
      shouldValidate: true,
    });
    setSelectedAddressId(0);
  };

  const onStateSelect = (event: SelectChangeEvent<unknown>): void => {
    const state = event.target.value as string;
    if (!state) {
      return;
    }
    setValue("shippingAddress.state", state, { shouldValidate: true });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Contact */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Contact
        </Typography>

        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <TextField
              fullWidth
              required
              size="small"
              label="Email Address"
              margin="normal"
              {...field}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          )}
        />

        <Controller
          name="newsletter"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value || false} />}
              label="Email me with news and offers"
            />
          )}
        />
      </Box>

      {/* Delivery Address */}
      <Box>
        {addresses.length > 0 && (
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h6">Choose a Delivery Address</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              We’ve listed your saved delivery addresses for convenience. If
              you&apos;d like us to deliver to any of them, simply select the
              one that works best for you.
            </Typography>
            {addresses.map((address) => (
              <Paper
                key={address.addressId}
                onClick={() => onAddressSelect(Number(address.addressId))}
                sx={{
                  mb: "10px",
                  p: 1,
                  borderRadius: "5px",
                  cursor: "pointer",
                  border:
                    selectedAddressId === address.addressId
                      ? "1.5px solid var(--primary-color)"
                      : "",
                  "&:hover": {
                    border: "1.5px solid var(--primary-color)",
                  },
                }}
              >
                <AddressFormatter props={address} />
              </Paper>
            ))}
          </Box>
        )}

        <Typography variant="h6" marginBottom={"10px"}>
          Delivery
        </Typography>

        <Controller
          name="locality"
          control={control}
          render={({ field }) => (
            <TextField
              label="Locality"
              required
              disabled
              size="small"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />

        {!shippingAddressId ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="shippingAddress.firstName"
                  control={control}
                  rules={{ required: "First name is required" }}
                  render={({ field }) => (
                    <TextField
                      label="First Name"
                      size="small"
                      required
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.shippingAddress?.firstName}
                      helperText={errors.shippingAddress?.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="shippingAddress.lastName"
                  control={control}
                  rules={{ required: "Last name is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Last Name"
                      size="small"
                      required
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.shippingAddress?.lastName}
                      helperText={errors.shippingAddress?.lastName?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Controller
                  name="shippingAddress.address"
                  control={control}
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Address"
                      required
                      size="small"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.shippingAddress?.address}
                      helperText={errors.shippingAddress?.address?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="shippingAddress.apartment"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Apartment, suite, etc. (optional)"
                      fullWidth
                      size="small"
                      required
                      margin="normal"
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="shippingAddress.city"
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <TextField
                      label="City"
                      fullWidth
                      size="small"
                      required
                      margin="normal"
                      {...field}
                      error={!!errors.shippingAddress?.city}
                      helperText={errors.shippingAddress?.city?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="shippingAddress.state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <StyledSelect
                      fullWidth
                      size="small"
                      displayEmpty
                      required
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => onStateSelect(e)}
                    >
                      <MenuItem disabled value="">
                        Select State
                      </MenuItem>
                      {states.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </StyledSelect>
                  )}
                />
                {errors.shippingAddress?.state && (
                  <Typography color="error" fontSize="0.75rem">
                    {errors.shippingAddress.state.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="shippingAddress.pincode"
                  control={control}
                  rules={{ required: "Pincode is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Pincode"
                      size="small"
                      required
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.shippingAddress?.pincode}
                      helperText={errors.shippingAddress?.pincode?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="shippingAddress.phone"
                  control={control}
                  rules={{ required: "Phone is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Phone"
                      size="small"
                      required
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.shippingAddress?.phone}
                      helperText={errors.shippingAddress?.phone?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default GuestCheckoutForm;
