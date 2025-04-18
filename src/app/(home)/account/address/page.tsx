"use client";

import CustomerAddresses from "@/components/site-components/UserManagement/CustomerAddresses";
import useUser from "@/customHooks/useUser";
import { IAddress } from "@/models/UserManagement/IUserData";
import { customerAddresses } from "@/services/UserManagementService/UsersService";
import { Box, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

export default function Address() {
  const [addresses, setAddress] = useState<IAddress[]>([]);
  const userData = useUser();

  const fetchAddress = useCallback(async () => {
    try {
      const response = await customerAddresses(userData.userId || 0);
      if (response) {
        setAddress(response);
      } else {
        setAddress([]);
      }
    } catch (error) {}
  }, [userData]);

  useEffect(() => {
    if (userData && userData.userId) {
      fetchAddress();
    }
  }, [fetchAddress, userData]);

  return (
    <>
      {!userData && addresses ? (
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <CustomerAddresses
            userData={{ userId: userData.userId, addresses, fetchAddress }}
          />
        </Box>
      )}
    </>
  );
}
