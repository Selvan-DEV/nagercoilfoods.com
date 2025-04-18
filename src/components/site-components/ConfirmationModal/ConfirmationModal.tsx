import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { NextPage } from "next";

interface IPageProps {
  message: string;
  openConfirmationModal: (confirm: boolean) => void;
  open: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationModal: NextPage<IPageProps> = (props) => {
  const { openConfirmationModal, message, open } = props;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => openConfirmationModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"CONFIRM"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => openConfirmationModal(false)}>Cancel</Button>
          <Button onClick={() => openConfirmationModal(true)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmationModal;
