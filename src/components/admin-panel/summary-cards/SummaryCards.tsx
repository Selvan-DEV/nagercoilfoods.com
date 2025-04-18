"use client";

import React from "react";
import { Grid, Paper, Stack, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import { useRouter } from "next/navigation";
import { IDashboardSummaryItems } from "@/app/(admin)/shop-management/model/ShopManagementModel";

interface IconMap {
  [key: string]: React.ReactNode;
}

const iconMap: IconMap = {
  people: <PeopleIcon />,
  order: <Inventory2Outlined />,
};

const SummaryCards = (props: { summaryCards: IDashboardSummaryItems[] }) => {
  const { summaryCards } = props;
  const router = useRouter();

  return (
    <Grid container spacing={3}>
      {summaryCards.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Paper
            elevation={3}
            sx={{ p: 2, cursor: "pointer", borderRadius: "8px" }}
            onClick={() => router.push(item.route)}
          >
            <Stack direction="column" alignItems="flex-start" spacing={1}>
              <Box
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                  width: "40px",
                }}
              >
                {iconMap[item.icon] || null}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  width: "100%",
                  paddingTop: "20px",
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.key}
                  </Typography>{" "}
                  {/* Customers label */}
                  <Typography variant="h5">{item.value}</Typography>{" "}
                  {/* Numerical value */}
                </Box>
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      backgroundColor: "#e8f5e9",
                      borderRadius: "4px",
                      p: 0.5,
                    }}
                  >
                    <ArrowUpwardIcon
                      sx={{ fontSize: "1rem", color: "#2e7d32" }}
                    />{" "}
                    <Typography variant="body2" color="#2e7d32">
                      {item.change}
                    </Typography>{" "}
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
