import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { IAddress } from "@/models/UserManagement/IUserData";
import { statesOfIndia } from "@/data/states-of-India";

interface AddressFormProps {
  open: boolean;
  selectedAddress: IAddress | null;
  onClose: () => void;
  onSubmit: (values: IAddress) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  open,
  onClose,
  onSubmit,
  selectedAddress,
}) => {
  const formik = useFormik<IAddress>({
    initialValues: {
      addressId: "",
      userId: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      landmark: "",
      alternatePhoneNumber: "",
      addressType: "",
      isActiveAddress: false,
    } as IAddress,
    validationSchema: Yup.object({
      firstName: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Name is required"),
      phoneNumber: Yup.number()
        .typeError("Phone number must be a number")
        .required("Phone number is required"),
      pincode: Yup.number()
        .typeError("Pincode must be a number")
        .required("Pincode is required"),
      locality: Yup.string().required("Locality is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      landmark: Yup.string(),
      alternatePhoneNumber: Yup.number().typeError(
        "Alternate phone number must be a number"
      ),
      addressType: Yup.string().required("Address type is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    if (selectedAddress) {
      formik.setValues(selectedAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress]);

  const isActiveAddressOnChange = (isChecked: boolean): void => {
    formik.setFieldValue("isActiveAddress", isChecked);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      disableEscapeKeyDown={true}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add New Address
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                required
                label="First Name"
                value={formik.values.firstName || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                required
                label="Last Name"
                value={formik.values.lastName || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="pincode"
                name="pincode"
                label="Pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="locality"
                name="locality"
                label="Locality"
                value={formik.values.locality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.locality && Boolean(formik.errors.locality)
                }
                helperText={formik.touched.locality && formik.errors.locality}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="State"
                name="state"
                required
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && String(formik.errors.state)}
              >
                {statesOfIndia.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="landmark"
                name="landmark"
                label="Landmark"
                value={formik.values.landmark}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.landmark && Boolean(formik.errors.landmark)
                }
                helperText={formik.touched.landmark && formik.errors.landmark}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="alternatePhoneNumber"
                name="alternatePhoneNumber"
                label="Alternate Phone Number"
                value={formik.values.alternatePhoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.alternatePhoneNumber &&
                  Boolean(formik.errors.alternatePhoneNumber)
                }
                helperText={
                  formik.touched.alternatePhoneNumber &&
                  formik.errors.alternatePhoneNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                id="addressType"
                name="addressType"
                label="Address Type"
                value={formik.values.addressType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.addressType &&
                  Boolean(formik.errors.addressType)
                }
                helperText={
                  formik.touched.addressType && formik.errors.addressType
                }
              >
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="isActiveAddress"
                    name="isActiveAddress"
                    color="primary"
                    checked={Boolean(formik.values.isActiveAddress)}
                    onChange={(e) => isActiveAddressOnChange(e.target.checked)}
                  />
                }
                label="Set as active address"
              />
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "10px",
                width: "100%",
              }}
            >
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </form>
    </Dialog>
  );
};

export default AddressForm;
