"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import UserForm from "@/components/site-components/UserManagement/UserPersonalInfoEdit";
import useUser from "@/customHooks/useUser";
import { IUserData, ILoginResponse } from "@/models/UserManagement/IUserData";
import { customerEdit } from "@/services/UserManagementService/UsersService";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function Profile() {
  const user = useUser();
  const [userData, setUserData] = useState<IUserData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setUserData(user);
      setIsLoading(false);
    } else {
      // Here you could potentially fetch the user data from local storage or make an API call.
      // For example:
      const storedUserData = (
        getSessionStorageItem("user-storage") as {
          state: { user: ILoginResponse };
        }
      ).state.user.user;
      if (storedUserData) {
        setUserData(storedUserData);
        setIsLoading(false);
      }
    }
  }, [user]);

  const handleSubmit = useCallback(
    async (updatedUser: IUserData) => {
      if (userData?.userId) {
        try {
          const response = await customerEdit(updatedUser);
          if (response) {
            toast.success("Sucess");
          }
        } catch (error) {}
      }
    },
    [userData]
  );

  return (
    <>
      {isLoading ? (
        <Box component={"div"} sx={loadingStyle}>
          <CircularProgress />
        </Box>
      ) : (
        <UserForm user={userData!} onSubmit={handleSubmit} />
      )}
    </>
  );
}
