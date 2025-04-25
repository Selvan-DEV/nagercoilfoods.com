import React from "react";
import { Box, Typography } from "@mui/material";

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  // Options for formatting the date and time
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  // Format the date with options
  return date.toLocaleString("en-US", options);
};

const DateTimeComponent = (data: { dateTime: string }) => {
  return (
    <Box>
      <Typography variant="body1" color="textSecondary">
        {formatDate(data.dateTime)}
      </Typography>
    </Box>
  );
};

export default DateTimeComponent;
