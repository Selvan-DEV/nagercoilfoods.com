"use client";

import ConfirmationModal from "@/components/site-components/ConfirmationModal/ConfirmationModal";
import NoDataFound from "@/components/site-components/NoDataFound/NoDataFound";
import CardFormComponent from "@/components/site-components/PaymentProcess/CardsManagement/CardForm";
import CardsList from "@/components/site-components/PaymentProcess/CardsManagement/CardsList";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { deleteCardByPaymentMethodId } from "@/services/PaymentProcess/PaymentProcessService";
import { Box, Button, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function UserCardsListPage() {
  const [cardModalOpen, setCardModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [paymentMethodId, setPaymentMethodId] = useState<string>();

  const onCloseAddModal = (isPaymentAdded: boolean) => {
    setCardModalOpen(false);
  };

  const onOpenAddCardModal = () => {
    setCardModalOpen(true);
  };

  const onConfirmModalOpen = (paymentMethodId: string) => {
    setPaymentMethodId(paymentMethodId);
    setConfirmModalOpen(true);
  };

  const onDelete = async (): Promise<void> => {
    if (paymentMethodId) {
      try {
        const data = (await deleteCardByPaymentMethodId(
          paymentMethodId
        )) as any;
        toast.success(data.message);
      } catch (error) {
        showErrorToast(error as AxiosError<ErrorResponse>);
      }
    }
  };

  const openConfirmationModal = (confirm: boolean): void => {
    if (confirm) {
      onDelete();
      return;
    }

    setConfirmModalOpen(false);
  };

  return (
    <>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography>Cards Informations</Typography>
        <Button onClick={() => onOpenAddCardModal()} variant="outlined">
          Add New Card
        </Button>
      </Box>

      <CardsList
        cardsDetails={[]}
        onConfirmModalOpen={onConfirmModalOpen}
        isCheckoutPage={true}
      />

      {[].length === 0 && <NoDataFound message="No Results found" />}

      {cardModalOpen && (
        <CardFormComponent open={cardModalOpen} onClose={onCloseAddModal} />
      )}

      {confirmModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this card info?"
          open={confirmModalOpen}
          openConfirmationModal={openConfirmationModal}
        />
      )}
    </>
  );
}
