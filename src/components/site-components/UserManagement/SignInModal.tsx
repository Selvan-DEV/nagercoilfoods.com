import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SignIn from "./SignIn";
import { NextPage } from "next";
import { Dispatch } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import Link from "@mui/material/Link";

interface IPageProps {
  openSignInModal: boolean;
  setOpenSignInModal: (userId: number | null) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignInModal: NextPage<IPageProps> = (props) => {
  const { openSignInModal, setOpenSignInModal } = props;

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={openSignInModal}
        onClose={() => setOpenSignInModal(null)}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenSignInModal(null)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sign In
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SignIn isModal={true} setOpenSignInModal={setOpenSignInModal} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Welcome to our Shop!
              </Typography>

              <Typography variant="body1" gutterBottom>
                If you have an account, please log in by entering your email
                address and password. Once you log in, you will be directed to
                the checkout page to proceed with your purchase.
              </Typography>

              <Typography variant="body1" gutterBottom>
                If you dont have an account yet, click the{" "}
                <Link href="/sign-up" variant="body2">
                  Sign Up
                </Link>{" "}
                link below to register. Once registered, you can continue to the
                checkout process.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default SignInModal;
