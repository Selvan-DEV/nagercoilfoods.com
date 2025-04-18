"use client";

import { ToastContainer } from "react-toastify";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import adminTheme from "@/theme/AdminTheme";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={outfit.className}>
        <ThemeProvider theme={adminTheme}>{children}</ThemeProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </body>
    </html>
  );
}
