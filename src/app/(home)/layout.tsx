"use client";

import { ReactNode } from "react";
import "../globals.css";
import { Outfit } from "next/font/google";
import AppLayoutComponent from "@/components/site-components/AppLayout/AppLayoutComponent";
import GlobalLoader from "@/components/shared/GlobalLoader";
import MotionWrapper from "@/components/site-components/common/MotionWrapper";
import { ToastContainer } from "react-toastify";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <title>Nila-Foods</title>
      </head>
      <body className={outfit.className}>
        <GlobalLoader />
        <AppLayoutComponent>
          <MotionWrapper>{children}</MotionWrapper>
        </AppLayoutComponent>
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
