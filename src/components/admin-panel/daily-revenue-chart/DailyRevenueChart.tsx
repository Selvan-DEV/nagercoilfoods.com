"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import { IDailyRevenueData } from "@/app/(admin)/shop-management/model/ShopManagementModel";
import { getDailyRevenue } from "@/services/ShopManagement/ShopDashboard";
import React, { useCallback, useEffect, useState } from "react";

export default function DailyRevenueChart(props: { shopId: number }) {
  const { shopId } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<IDailyRevenueData[] | null>(null);

  const getDailyRevenusByShopId = useCallback(async () => {
    if (!shopId) return;
    try {
      setLoading(true);
      const recentOrders = await getDailyRevenue(shopId);
      if (recentOrders) {
        setChartData(recentOrders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    getDailyRevenusByShopId();
  }, [getDailyRevenusByShopId]);

  return (
    <Paper sx={{ padding: 2, marginTop: "20px" }}>
      <Typography variant="h6" mb={2}>
        Daily Revenue
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        chartData && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      )}
    </Paper>
  );
}
