"use client";

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from "recharts";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { IMonthlyRevenueData } from "@/app/(admin)/shop-management/model/ShopManagementModel";
import { getMonthlyRevenue } from "@/services/ShopManagement/ShopDashboard";
import React, { useCallback, useEffect, useState } from "react";

export default function MontlyRevenueChart(props: { shopId: number }) {
  const { shopId } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<IMonthlyRevenueData[] | null>(
    null
  );

  const getMonthlyRevenusByShopId = useCallback(async () => {
    if (!shopId) return;
    try {
      setLoading(true);
      const response = await getMonthlyRevenue(shopId);
      if (response) setChartData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    getMonthlyRevenusByShopId();
  }, [getMonthlyRevenusByShopId]);

  return (
    <Paper sx={{ padding: 2, marginTop: "20px" }}>
      <Typography variant="h6" mb={2}>
        Monthly Revenue
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        chartData && (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#388e3c" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#e5f4e3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#388e3c"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      )}
    </Paper>
  );
}
