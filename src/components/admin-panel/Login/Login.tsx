"use client";

import {
  CssBaseline,
  Box,
  Typography,
  TextField,
  Grid,
  Link,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { AxiosError } from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { adminLogin } from "@/services/UserManagementService/UsersService";
import { setItemToSessionStorage } from "@/shared/SharedService/StorageService";

export interface SignInFormValues {
  email: string;
  password: string;
  role: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues: SignInFormValues = {
  email: "",
  password: "",
  role: "Admin",
};

export default function ShopLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (formValues: SignInFormValues) => {
    try {
      setLoading(true);
      formValues.role = "Admin";
      const data = await adminLogin(formValues);
      if (data) {
        setItemToSessionStorage("adminData", data);
        router.push("/shop-management/dashboard");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showErrorToast(error as AxiosError<ErrorResponse>);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: "url(/images/bg/AdminPanelLoginBg.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "contain",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            Enter your email and password to sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(e) => handleSubmit(e)}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Box>
                    <input type="checkbox" id="keepLoggedIn" />
                    <label htmlFor="keepLoggedIn" style={{ marginLeft: "8px" }}>
                      Keep me logged in
                    </label>
                  </Box>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Box>
                <LoadingButton
                  type="submit"
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "100%" }}
                >
                  <span>Sign In</span>
                </LoadingButton>
                <Typography variant="body2" align="center">
                  Don&apos;t have an account?{" "}
                  <Link href="#" variant="body2">
                    Sign Up
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}
