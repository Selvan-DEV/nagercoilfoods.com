import React from "react";
import { Chip } from "@mui/material";

export default function ChipComponent(props: { value: string }) {
  const { value } = props;

  const getChipStyles = (status: string) => {
    switch (status) {
      case "Order Received":
        return { backgroundColor: "#e0f7fa", color: "#00acc1" };
      case "Processing":
        return { backgroundColor: "#fffde7", color: "#f9a825" };
      case "Packing":
        return { backgroundColor: "#f0f4c3", color: "#9e9d24" };
      case "Ready for Dispatch":
        return { backgroundColor: "#e8f5e9", color: "#43a047" };
      case "Dispatched":
        return { backgroundColor: "#bbdefb", color: "#1976d2" };
      case "Out for Delivery":
        return { backgroundColor: "#ffecb3", color: "#ef6c00" };
      case "Delivered":
      case "Active":
      case "Paid":
        return { backgroundColor: "#e8f5e9", color: "#2e7d32" };
      case "Inactive":
        return { backgroundColor: "#ffe1e1", color: "#8a3939" };
      default:
        return { backgroundColor: "#ffebee", color: "#d32f2f" };
    }
  };

  const chipStyles = getChipStyles(value);

  return (
    <Chip
      label={value}
      size="small"
      sx={{
        backgroundColor: chipStyles.backgroundColor,
        color: chipStyles.color,
        textTransform: "capitalize",
      }}
    />
  );
}
