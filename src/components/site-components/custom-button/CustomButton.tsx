import React from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "@emotion/styled";

const CustomButtonStyled = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  border-radius: 50px;
  padding: 12px 24px;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: var(--primary-color);
  }
`;

const CustomButton = (props: { onClick: () => void; name: string }) => {
  const { onClick, name } = props;
  return (
    <CustomButtonStyled onClick={onClick}>
      {name}
      <ArrowForwardIcon />
    </CustomButtonStyled>
  );
};

export default CustomButton;
