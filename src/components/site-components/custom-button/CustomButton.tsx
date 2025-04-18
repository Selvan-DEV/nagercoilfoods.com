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
    background-color: #976f08;
  }
`;

const CustomButton = (props: { onClick: () => void }) => {
  const { onClick } = props;
  return (
    <CustomButtonStyled onClick={onClick}>
      All Products
      <ArrowForwardIcon />
    </CustomButtonStyled>
  );
};

export default CustomButton;
