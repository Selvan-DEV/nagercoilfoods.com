import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Grid,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { IUserData } from "@/models/UserManagement/IUserData";

interface UserFormProps {
  user: IUserData;
  onSubmit: (values: IUserData) => void;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.number()
    .typeError("Phone number must be a number")
    .nullable()
    .required("Phone number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
});

const useStyles = {
  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  avatarStyle: {
    width: 100,
    height: 100,
  },
};

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.ImageURL || ""
  );

  const formik = useFormik<IUserData>({
    initialValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      isPrimaryUser: user.isPrimaryUser,
      password: "",
      phoneNumber: user.phoneNumber,
      userId: user.userId,
      ImageURL: user.ImageURL,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, ImageURL: profileImage || "" });
      setIsEditing(false);
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleEditClick = (): void => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result as string);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    []
  );

  return (
    <Box sx={{ padding: "15px" }}>
      <Box component={"div"} sx={useStyles.formHeader}>
        <Typography>Update Personal Info</Typography>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          {!isEditing && (
            <IconButton
              onClick={handleEditClick}
              color="primary"
              aria-label="Edit profile"
            >
              <EditIcon />
            </IconButton>
          )}
        </Grid>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          {/* <Grid item xs={12} sm={3}>
            <Avatar
              alt="Profile Picture"
              src={profileImage || ""}
              sx={useStyles.avatarStyle}
            />
            {isEditing && (
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-pic-upload"
                type="file"
                onChange={handleImageChange}
              />
            )}
            {isEditing && (
              <label htmlFor="profile-pic-upload">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            )}
          </Grid> */}
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
          </Grid>
          {isEditing && (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
            >
              <Button
                type="button"
                color="primary"
                variant="outlined"
                onClick={handleEditClick}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
};

export default UserForm;
