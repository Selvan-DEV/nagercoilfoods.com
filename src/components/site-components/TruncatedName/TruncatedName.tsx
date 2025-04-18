// components/TruncatedName.tsx
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface TruncatedNameProps {
  name: string;
  count: number;
}

const TruncatedName: React.FC<TruncatedNameProps> = ({ name, count = 10 }) => {
  const truncateName = (str: string) => {
    return str.length > count ? `${str.substring(0, count)}...` : str;
  };

  return (
    <Tooltip title={name} arrow>
      <Typography variant="body1" noWrap>
        {truncateName(name)}
      </Typography>
    </Tooltip>
  );
};

export default TruncatedName;
