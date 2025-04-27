"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { forgotPassword } from "@/services/UserManagementService/UsersService";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  oldPassword: Yup.string().required("New Password is required"),
  newPassword: Yup.string()
    .required("Confirm Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export interface IChangePasswordFormValues {
  email: string;
  oldPassword: string;
  newPassword: string;
}

const initialValues: IChangePasswordFormValues = {
  email: "",
  oldPassword: "",
  newPassword: "",
};

export default function ForgotPasswordComponent() {
  const router = useRouter();

  const handleSubmit = async (values: IChangePasswordFormValues) => {
    try {
      const response = await forgotPassword(values);
      if (response) {
        toast.success("Success");
        router.push("/sign-in");
      }
    } catch (error) {}
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, handleBlur }) => (
        <Container component="main" maxWidth="xs">
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
              <LockResetOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box component="div" sx={{ mt: 1 }}>
              <Form className="form form-label-right">
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
                  name="oldPassword"
                  label="New Password"
                  type="password"
                  id="old-password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.oldPassword && Boolean(errors.oldPassword)}
                  helperText={touched.oldPassword && errors.oldPassword}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  label="Confirm Password"
                  type="password"
                  id="new-password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Form>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
}
