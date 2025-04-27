"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";
import { useUserStore } from "@/store/site-store/useUserStore";
import { ILoginResponse } from "@/models/UserManagement/IUserData";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface IPageProps {
  isModal: boolean;
  setOpenSignInModal?: (userId: number | null) => void;
}

interface SignInFormValues {
  email: string;
  password: string;
  sessionId: string | null;
  role: string;
}

const initialValues: SignInFormValues = {
  email: "",
  password: "",
  sessionId: "",
  role: "",
};

const SignIn: NextPage<IPageProps> = (props) => {
  const { isModal, setOpenSignInModal } = props;
  const login = useUserStore((state) => state.login);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: SignInFormValues) => {
    const sessionId = getSessionStorageItem("sessionId") as string;
    values.sessionId = sessionId ? sessionId : null;
    values.role = "Customer";

    try {
      setLoading(true);
      const res = await login(values);
      const responseData = res as ILoginResponse;
      if (
        responseData &&
        responseData.hasOwnProperty("token") &&
        responseData.token
      ) {
        if (isModal && setOpenSignInModal) {
          const userId = res.user.userId || 0;
          setOpenSignInModal(userId);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginTop: 13, padding: "0 20px" }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
              <LoadingButton
                type="submit"
                loading={loading}
                disabled={loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? "...loaidng" : "Sign In"}
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignIn;
