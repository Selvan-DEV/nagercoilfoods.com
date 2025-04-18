import { Box, Button, Typography } from "@mui/material";

interface Props {
  mode: "login" | "guest";
  setMode: (val: "login" | "guest") => void;
}

export default function LoginOrGuestToggle({ mode, setMode }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Checkout Options
      </Typography>
      <Button
        variant={mode === "login" ? "contained" : "outlined"}
        sx={{ mr: 2 }}
        onClick={() => setMode("login")}
      >
        Login
      </Button>
      {/* <Button
        variant={mode === "guest" ? "contained" : "outlined"}
        onClick={() => setMode("guest")}
      >
        Continue as Guest
      </Button> */}
    </Box>
  );
}
