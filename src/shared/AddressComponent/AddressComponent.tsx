import React from "react";
import { Box, Typography } from "@mui/material";
import { IAddress } from "@/models/UserManagement/IUserData";

const AddressFormatter: React.FC<{ props: IAddress }> = ({ props }) => {
  const {
    firstName,
    lastName,
    locality,
    landmark,
    city,
    state,
    pincode,
    phoneNumber,
    alternatePhoneNumber,
  } = props;

  return (
    <Box>
      <Typography>{firstName + " " + lastName}</Typography>
      <Typography variant="body2" color="textSecondary">
        {locality}, Landmark: {landmark}
      </Typography>

      <Typography variant="body2" color="textSecondary">
        {city}, {state} - {pincode}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Phone: {phoneNumber}
        {alternatePhoneNumber && `, Alternate: ${alternatePhoneNumber}`}
      </Typography>
    </Box>
  );
};

export default AddressFormatter;
