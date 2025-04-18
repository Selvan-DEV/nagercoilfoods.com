import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { NextPage } from "next";
import { ListItemIcon, Paper } from "@mui/material";
import { FormikProps } from "formik";
import { ICardsDetails } from "@/models/PaymentProcess/PaymentModel";

interface IPageProps {
  cardsDetails: ICardsDetails[];
  onConfirmModalOpen?: (paymentMethodId: string) => void;
  isCheckoutPage: boolean;
  setCardDetails?: (paymentMethodId: string) => void;
  selectedCard?: string;
  formik?: FormikProps<any>;
}

const CardsList: NextPage<IPageProps> = (props) => {
  const {
    cardsDetails,
    onConfirmModalOpen,
    isCheckoutPage,
    setCardDetails,
    selectedCard,
    formik,
  } = props;

  const openConfirmModal = (paymentMethodId: string): void => {
    if (onConfirmModalOpen) {
      onConfirmModalOpen(paymentMethodId);
    }
  };

  const onSelectPaymentMethod = (paymentMethodId: string) => {
    if (formik) {
      formik.setFieldValue("paymentMethodId", paymentMethodId);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: "15px", maxWidth: 752 }}>
      <Grid container spacing={2}>
        {cardsDetails.length > 0 &&
          cardsDetails.map((card, index) => (
            <Grid item xs={12} md={12} key={index}>
              <List
                sx={{
                  borderRadius: "5px",
                  border:
                    formik?.values.paymentMethodId === card.paymentMethodId
                      ? "2px solid #007bff"
                      : "1px solid #d7d7d7",
                  cursor:
                    formik?.values.paymentMethodId === card.paymentMethodId
                      ? "pointer"
                      : "default",
                }}
                onClick={() => onSelectPaymentMethod(card.paymentMethodId)}
              >
                <ListItem
                  secondaryAction={
                    isCheckoutPage ? (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => openConfirmModal(card.paymentMethodId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null
                  }
                >
                  <ListItemIcon>
                    <CreditCardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={card.brand}
                    secondary={
                      "Card ends with " +
                      "xxxx" +
                      card.cardNumber +
                      ", " +
                      "Expiry on " +
                      card.expMonth +
                      "/" +
                      card.expYear
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default CardsList;
