"use client";

import { Box, Grid } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import {
  IDashboardSummaryItems,
  IRecentOrders,
} from "@/app/(admin)/shop-management/model/ShopManagementModel";
import RecentOrders from "./recent-orders/RecentOrders";
import ReviewsCards from "./review-cards/ReviewsCards";
import SummaryCards from "./summary-cards/SummaryCards";
import MontlyRevenueChart from "./monthly-revenue-chart/MontlyRevenueChart";
import DailyRevenueChart from "./daily-revenue-chart/DailyRevenueChart";

interface IPageProps {
  summaryCards: IDashboardSummaryItems[];
  recentOrders: IRecentOrders[];
  shopId: number;
}

const AdvancedDashboard: NextPage<IPageProps> = (props) => {
  const { summaryCards, recentOrders, shopId } = props;

  return (
    <Box sx={{ p: 3 }}>
      <SummaryCards summaryCards={summaryCards} />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ marginBottom: "20px" }}
      >
        <Grid item md={6}>
          <MontlyRevenueChart shopId={shopId} />
        </Grid>
        <Grid item md={6}>
          <DailyRevenueChart shopId={shopId} />
        </Grid>
      </Grid>

      <RecentOrders
        recentOrders={recentOrders}
        pageTitle="Recent orders"
        shopId={shopId}
        orderStatuses={[]}
        onStatusChange={(payload) => console.log(payload)}
      />
    </Box>
  );
};

export default AdvancedDashboard;
