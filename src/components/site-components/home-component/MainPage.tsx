/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Box } from "@mui/material";

import { useRouter } from "next/navigation";
import MainPageSlider from "@/components/site-components/home/MainPageSlider";
import TopSaleSlider from "@/components/site-components/home/TopSaleSlider";
import MakingUpdate from "@/components/site-components/home/MonthlyDeals";
import PopularProducts from "@/components/site-components/home/PopularProducts";
import FAQs from "@/components/site-components/home/Faqa";
import TrustedInfo from "@/components/site-components/home/TrustedInfo";
import TestimonialsSection from "@/components/site-components/home/TestimonialsSection";

const MainPage = () => {
  // Slider settings for Top Sale Carousel

  return (
    <Box>
      {/* Main Banner */}
      <MainPageSlider />

      {/* Popular Products */}
      <PopularProducts />

      {/* Monthly Deals */}
      <MakingUpdate />

      {/* Top Sale - Carousel */}
      <TopSaleSlider />

      {/* Trusted Ino banner */}
      {/* <TrustedInfo /> */}

      <TestimonialsSection />

      {/* FAQ */}
      <FAQs />
    </Box>
  );
};

export default MainPage;
