"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { IUserData } from "@/models/UserManagement/IUserData";

const options = ["Add Voucher", "Gift Card"];

interface IPageProps {
  customers: IUserData[];
}

const CustomerList: NextPage<IPageProps> = (props) => {
  const { customers } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("query") || "";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState<string | "">(status);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSearchQueryChange = (searchQuery: string) => {
    setSearchQuery(searchQuery);

    // Add 1-second delay
    setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (searchQuery) {
        newSearchParams.set("query", searchQuery);
      } else {
        newSearchParams.delete("query");
      }

      router.push(`?${newSearchParams.toString()}`);
    }, 500);
  };

  return (
    <Paper sx={{ margin: "25px", minHeight: "100vh", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Customers ({customers.length})
        </Typography>
        <Box>
          <TextField
            size="small"
            id="outlined-basic"
            label="Search with name.."
            variant="outlined"
            value={searchQuery || ""}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        </Box>
      </Box>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="customer table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>
                  {customer.firstName} {customer.lastName}
                </TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomerList;
