import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Box,
  Grid,
  Select,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { ICheckoutSessionFormValues } from "./CheckoutPageBeta";
import { statesOfIndia } from "@/data/states-of-India";

const StyledSelect = styled(Select)`
  && {
    margin-top: 16px;
  }
`;

const BillingAddress = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ICheckoutSessionFormValues>();
  const billingSameAsShipping = watch("billingSameAsShipping");

  const onBillingAddressSwtichChange = (isSame: boolean) => {
    setValue("billingSameAsShipping", isSame);
    if (!isSame) {
      setValue("billingAddressId", 0);
    }
  };

  return (
    <>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Billing address</FormLabel>
        <Controller
          name="billingSameAsShipping"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              value={field.value ? "same" : "different"}
              onChange={(e) => {
                const value = e.target.value === "same";
                onBillingAddressSwtichChange(value);
              }}
            >
              <FormControlLabel
                value="same"
                control={<Radio />}
                label="Same as shipping address"
              />
              <FormControlLabel
                value="different"
                control={<Radio />}
                label="Use a different billing address"
              />
            </RadioGroup>
          )}
        />
      </FormControl>

      {/* Conditionally render the billing address form */}
      {!billingSameAsShipping && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="billingAddress.firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <TextField
                    label="First Name"
                    size="small"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.billingAddress?.firstName}
                    helperText={errors.billingAddress?.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="billingAddress.lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <TextField
                    label="Last Name"
                    size="small"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.billingAddress?.lastName}
                    helperText={errors.billingAddress?.lastName?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                name="billingAddress.address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <TextField
                    label="Address"
                    size="small"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.billingAddress?.address}
                    helperText={errors.billingAddress?.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="billingAddress.apartment"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Apartment, suite, etc. (optional)"
                    fullWidth
                    size="small"
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="billingAddress.city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <TextField
                    label="City"
                    fullWidth
                    size="small"
                    margin="normal"
                    {...field}
                    error={!!errors.billingAddress?.city}
                    helperText={errors.billingAddress?.city?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="billingAddress.state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <StyledSelect
                    fullWidth
                    size="small"
                    displayEmpty
                    {...field}
                    value={field.value || ""}
                  >
                    <MenuItem disabled value="">
                      Select State
                    </MenuItem>
                    {statesOfIndia.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                )}
              />
              {errors.billingAddress?.state && (
                <Typography color="error" fontSize="0.75rem">
                  {errors.billingAddress.state.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="billingAddress.pincode"
                control={control}
                rules={{ required: "Pincode is required" }}
                render={({ field }) => (
                  <TextField
                    label="Pincode"
                    fullWidth
                    size="small"
                    margin="normal"
                    {...field}
                    error={!!errors.billingAddress?.pincode}
                    helperText={errors.billingAddress?.pincode?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="billingAddress.phone"
                control={control}
                rules={{ required: "Phone is required" }}
                render={({ field }) => (
                  <TextField
                    label="Phone"
                    size="small"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.billingAddress?.phone}
                    helperText={errors.billingAddress?.phone?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default BillingAddress;
