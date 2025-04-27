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

export const metadata = {
  title:
    "Nagercoil Special Chips - Buy Karacho, Seeval, Mixture Online | Authentic Taste",
  description:
    "Order authentic Nagercoil Karacho, Seeval, and Mixture online! Fresh, crunchy, and homemade-style snacks delivered straight to your doorstep. Taste the tradition of South India.",
  keywords: "chips, snacks, nagercoil special, karacho, seeval, mixture",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <title>nila foods</title>
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
