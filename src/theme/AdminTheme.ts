// adminTheme.ts
import { createTheme } from "@mui/material/styles";

const adminTheme = createTheme({
  palette: {
    primary: {
      main: "#6a9f34",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
    },
  },
  typography: {
    fontFamily: "var(--font-outfit), sans-serif"
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          color: "#1f2937",
          borderRight: "1px solid #e5e7eb",
          borderRadius: 0
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#e5f4e3",
            color: "#388e3c",
            "& .MuiListItemIcon-root": {
              color: "#388e3c",
            }
          },
          "&:hover": {
            backgroundColor: "#f0fdf4",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#6b7280",
          minWidth: "36px",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.06)",
          borderRadius: "12px",
          border: "1px solid #e5e7eb"
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "inherit", // Optional: remove default blue
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
  },
});

export default adminTheme;
