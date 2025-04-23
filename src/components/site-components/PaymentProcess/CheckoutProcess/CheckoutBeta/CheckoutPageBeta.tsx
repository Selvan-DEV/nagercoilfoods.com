"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import GuestCheckoutForm from "./GuestCheckoutForm";
import Info from "../Info";
import {
  ICartSummayItems,
  ICheckoutSessionInfo,
} from "@/models/OrderManagement/IAddOrUpdateCartPayload";
import LoginOrGuestToggle from "./LoginOrGuestToggle";
import { useCallback, useEffect, useState } from "react";
import SignInModal from "@/components/site-components/UserManagement/SignInModal";
import { getCustomerActiveAddress } from "@/services/UserManagementService/UsersService";
import showErrorToast from "@/components/showErrorToast";
import useUser from "@/customHooks/useUser";
import { IAddress } from "@/models/UserManagement/IUserData";
import BillingAddress from "./BillingAddress";
import {
  createCheckoutSession,
  getCheckoutSessionDataById,
} from "@/services/OrderService/OrderService";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckoutReviewDialog from "./CheckoutReviewDialog";

export interface ICheckoutSessionFormValues {
  newsletter: boolean;
  discountCode: string;
  discountValue: number;
  deliveryCharge: number;
  email: string;
  userId: number;

  sessionId: string;
  locality: string;
  shippingAddressId: number;
  billingAddressId: number;
  totalPrice: number;

  billingSameAsShipping: boolean;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
}

const defaultValues = {
  newsletter: true,
  discountCode: "",
  discountValue: 0,
  deliveryCharge: 0,
  email: "",
  userId: 0,
  sessionId: "",
  locality: "India",
  shippingAddressId: 0,
  billingAddressId: 0,
  totalPrice: 0,
  shippingAddress: {
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  },
  billingSameAsShipping: true,
  billingAddress: {
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  },
};

const schema = Yup.object().shape({
  shippingAddress: Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    apartment: Yup.string(),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
  }),
  billingSameAsShipping: Yup.boolean(),
  newsletter: Yup.boolean(),
  userId: Yup.number(),
  totalPrice: Yup.number(),
  sessionId: Yup.string(),
  email: Yup.string().email("Invalid email").required("Required"),
  billingAddress: Yup.object().when("billingSameAsShipping", {
    is: false,
    then: () =>
      Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        apartment: Yup.string(),
        city: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        pincode: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
      }),
    otherwise: () => Yup.object().notRequired(),
  }),
});

const CheckoutPage = (props: { cartProductsWithSummary: ICartSummayItems }) => {
  const { userId, email } = useUser();
  const { cartProductsWithSummary } = props;

  const [mode, setMode] = useState<"login" | "guest">("guest");
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [fetchingAddress, setAddressFetching] = useState(false);
  const [customerAddresses, setCustomerAddresses] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [checkoutSessionValues, setAllvalues] =
    useState<ICheckoutSessionInfo | null>(null);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const setCheckoutMode = useCallback((mode: "login" | "guest") => {
    if (mode === "login") {
      setOpenSignInModal(true);
    }
    setMode(mode);
  }, []);

  const handleSignInModalClose = useCallback((userId: number | null): void => {
    if (userId && userId > 0) {
      getCustomerAddress(userId);
    }
    setOpenSignInModal(false);
  }, []);

  const getCustomerAddress = async (userId: number) => {
    try {
      setAddressFetching(true);
      const data = await getCustomerActiveAddress(userId);
      if (data && data.length) {
        setCustomerAddresses(data);
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setAddressFetching(false);
    }
  };

  useEffect(() => {
    if (userId) {
      methods.setValue("userId", userId);
      methods.setValue("email", email);
      getCustomerAddress(userId);
    } else {
      const sessionId = getSessionStorageItem("sessionId") as string;
      if (sessionId) {
        methods.setValue("sessionId", sessionId);
      }
    }
  }, [email, methods, userId]);

  useEffect(() => {
    if (
      cartProductsWithSummary &&
      cartProductsWithSummary.summary &&
      cartProductsWithSummary.summary.totalPrice
    ) {
      const { totalPrice } = cartProductsWithSummary.summary;
      methods.setValue("totalPrice", Number(totalPrice), {
        shouldValidate: true,
      });
    }
  }, [cartProductsWithSummary, methods]);

  const onSubmit = async (data: any): Promise<void> => {
    setLoading(true);
    const payload = data as ICheckoutSessionFormValues;
    try {
      const response = await createCheckoutSession(payload);
      if (response.checkoutSessionId) {
        getCheckoutSessionItem(response.checkoutSessionId);
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  const getCheckoutSessionItem = async (id: number): Promise<void> => {
    try {
      const response = await getCheckoutSessionDataById(id);
      if (response) {
        setAllvalues(response);
        setReviewModalOpen(true);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 2, marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT — Summary Info */}
          <Grid item xs={12} md={6}>
            <FormProvider {...methods}>
              <Info cartProductsWithSummary={cartProductsWithSummary} />
            </FormProvider>
          </Grid>

          {/* RIGHT — Guest Form */}
          <Grid item xs={12} md={6}>
            {!userId && (
              <LoginOrGuestToggle mode={mode} setMode={setCheckoutMode} />
            )}

            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormProvider {...methods}>
                <GuestCheckoutForm
                  addresses={customerAddresses}
                  fetchingAddress={fetchingAddress}
                />

                <BillingAddress />
              </FormProvider>

              <Box textAlign="right" mt={2}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={!methods.formState.isValid || loading}
                  loading={loading}
                  loadingPosition="start"
                >
                  Continue to Payment
                </LoadingButton>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>

      <SignInModal
        openSignInModal={openSignInModal}
        setOpenSignInModal={handleSignInModalClose}
      />

      {checkoutSessionValues && isReviewModalOpen && (
        <CheckoutReviewDialog
          open={isReviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          reviewValues={checkoutSessionValues}
          cartProductsWithSummary={cartProductsWithSummary}
        />
      )}
    </>
  );
};

export default CheckoutPage;
