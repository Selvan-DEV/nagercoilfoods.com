"use client";

import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddressForm from "./AddAddressModal";
import { NextPage } from "next";

import { toast } from "react-toastify";
import NoDataFound from "../NoDataFound/NoDataFound";
import {
  editCustomerAddress,
  addCustomerAddress,
  deleteCustomerAddress,
} from "@/services/UserManagementService/UsersService";
import { IAddress } from "@/models/UserManagement/IUserData";
import showErrorToast from "@/components/showErrorToast";

interface PageProps {
  userData: {
    userId: number | undefined | null;
    addresses: IAddress[];
    fetchAddress: () => void;
  };
}

const CustomerAddresses: NextPage<PageProps> = (props) => {
  const { userData } = props;
  const [open, setOpen] = useState<boolean>();
  const [selectedAddress, setAddressToEdit] = useState<IAddress | null>(null);

  const onClose = () => {
    setAddressToEdit(null);
    setOpen(false);
  };

  const onAddressModalOpen = (selectedAddress?: IAddress) => {
    if (selectedAddress) {
      setAddressToEdit(selectedAddress);
    }

    setOpen(true);
  };

  const onSubmit = async (formValues: IAddress): Promise<void> => {
    if (selectedAddress) {
      try {
        const editResponse = await editCustomerAddress(formValues);
        if (editResponse) {
          toast.success("success");
          userData.fetchAddress();
          onClose();
        }
      } catch (error) {
        showErrorToast(error);
      }
      return;
    }

    formValues.userId = userData.userId || 0;
    try {
      formValues.isActiveAddress = formValues.isActiveAddress ? 1 : 0;
      const addResponse = await addCustomerAddress(formValues);
      if (addResponse) {
        toast.success("success");
        userData.fetchAddress();
        onClose();
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  const onDeleteModalOpen = async (addressId: number): Promise<void> => {
    if (addressId) {
      const payload = {
        userId: userData.userId,
        addressId,
      };
      if (payload.userId) {
        try {
          const deleteResponse = await deleteCustomerAddress(payload);
          if (deleteResponse) {
            toast.success("Success");
            userData.fetchAddress();
          }
        } catch (error) {}
      }
    }
  };

  return (
    <>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <Typography>Manage Address</Typography>
        <Button onClick={() => onAddressModalOpen()} variant="outlined">
          Add Address
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address Type</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userData.addresses.length > 0 &&
              userData.addresses.map((row) => (
                <TableRow
                  key={row.addressId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName + " " + row.lastName}
                  </TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.addressType}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell width={300}>{row.address}</TableCell>
                  <TableCell>
                    {/* <Typography
                      component="a"
                      variant="body2"
                      color="text.primary"
                      sx={{ textDecoration: "underline", marginRight: "5px" }}
                    >
                      Edit
                    </Typography>
                    <Typography
                      component="a"
                      variant="body2"
                      color="text.primary"
                      sx={{ textDecoration: "underline", marginRight: "5px" }}
                    >
                      Delete
                    </Typography> */}
                    <Box
                      component={"div"}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        aria-label="edit"
                        onClick={() => onAddressModalOpen(row)}
                      >
                        <BorderColorIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => onDeleteModalOpen(Number(row.addressId))}
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {open && (
        <AddressForm
          open={open}
          selectedAddress={selectedAddress}
          onClose={() => onClose()}
          onSubmit={(formValues) => onSubmit(formValues)}
        />
      )}
    </>
  );
};

export default CustomerAddresses;
