import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { NextPage } from "next";
import LoadingButton from "@mui/lab/LoadingButton";

interface IPageProps {
  title: string;
  open: boolean;
  message: string;
  loading: boolean;
  onSubmit: (isConfrim: boolean) => void;
}

const ConfirmModal: NextPage<IPageProps> = (props) => {
  const { title, open, onSubmit, message, loading } = props;
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => onSubmit(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onSubmit(false)}>Cancel</Button>
          <LoadingButton
            onClick={() => onSubmit(true)}
            loading={loading}
            loadingPosition="start"
            autoFocus
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmModal;
