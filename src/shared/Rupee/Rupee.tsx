import React from "react";
import { NextPage } from "next";
import { Typography } from "@mui/material";

const Rupee: NextPage<{
  rupee: number;
  weight?: string;
  isLineThrough?: boolean;
}> = (props) => {
  const { rupee, isLineThrough } = props;
  return (
    <Typography
      variant="h5"
      sx={{ textDecoration: isLineThrough ? "line-through" : "" }}
      color={isLineThrough ? "text.secondary" : ""}
    >
      Rs.{rupee}
    </Typography>
  );
};

export default Rupee;
