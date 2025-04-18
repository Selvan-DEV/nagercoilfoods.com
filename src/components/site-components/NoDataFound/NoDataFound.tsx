"use client";

import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { useRouter } from "next/navigation";

interface IPageProps {
  message: string;
  isButtonShow?: boolean;
}

const NoDataFound: NextPage<IPageProps> = (props) => {
  const { message, isButtonShow } = props;
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        flexDirection: "column",
      }}
    >
      <InboxOutlinedIcon sx={{ fontSize: 60, color: "text.secondary" }} />
      <Typography variant="h5" color="text.secondary" marginTop={2}>
        {message}
      </Typography>
      {isButtonShow ? (
        <Button
          sx={{ marginTop: "30px" }}
          variant="contained"
          onClick={() => router.push("/shop")}
        >
          SHOP NOW
        </Button>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default NoDataFound;
