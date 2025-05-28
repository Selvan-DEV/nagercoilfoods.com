/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import "../globals.css";
import { Outfit } from "next/font/google";
import AppLayoutComponent from "@/components/site-components/AppLayout/AppLayoutComponent";
import GlobalLoader from "@/components/shared/GlobalLoader";
import MotionWrapper from "@/components/site-components/common/MotionWrapper";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

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
      <Head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1120531910101112');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            alt="fb"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1120531910101112&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </Head>
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
