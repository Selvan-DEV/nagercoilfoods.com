import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {
  IRecentOrderProducts,
  IRecentOrders,
} from "@/app/(admin)/shop-management/model/ShopManagementModel";
import { NextPage } from "next";
import ChipComponent from "@/components/site-components/chip-component/ChipComponent";
import NoDataFound from "@/components/site-components/NoDataFound/NoDataFound";
import AddressFormatter from "@/shared/AddressComponent/AddressComponent";
import DateTimeComponent from "@/shared/StandaredDateTime/DateTime";
import LoadingButton from "@mui/lab/LoadingButton";
import { getOrdersByShopId } from "@/services/ShopManagement/ShopManagement";
import Link from "next/link";

interface IPageProps {
  recentOrders: IRecentOrders[];
  pageTitle: string;
  shopId: number;
}

const OrderTable: NextPage<IPageProps> = (props) => {
  const { recentOrders, pageTitle, shopId } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const handleExport = async () => {
    try {
      setLoading(true);
      const csvBlob = await getOrdersByShopId(shopId, "1", "Yes");
      const url = window.URL.createObjectURL(csvBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = new Date() + "orders.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download CSV:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {pageTitle}
        </Typography>
        <LoadingButton
          variant="contained"
          onClick={handleExport}
          loading={loading}
          loadingPosition="start"
        >
          Export
        </LoadingButton>
      </Box>

      {!recentOrders || !recentOrders.length ? (
        <NoDataFound message="No Recent Orders" />
      ) : (
        <TableContainer>
          <Table
            sx={{ minWidth: 650, borderCollapse: "collapse" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                  #Order
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                  Product
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  Price
                </TableCell>

                <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                  Billing Address
                </TableCell>

                <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                  Shipping Address
                </TableCell>
                <TableCell>Ordered Date</TableCell>
                <TableCell
                  align="left"
                  sx={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  Delivery Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map((row) => (
                <TableRow
                  key={row.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                    <Link href={`/shop-management/orders/${row.orderId}`}>
                      <Typography color="primary">#{row.orderId}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "1px solid #e0e0e0" }}
                  >
                    <Box display="flex" alignItems="center">
                      <Box>
                        {row.products.map(
                          (product: IRecentOrderProducts, index: number) => (
                            <Box key={index}>
                              <Typography>{product.productName}</Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Qty - {product.orderQuantity}
                              </Typography>
                            </Box>
                          )
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "1px solid #e0e0e0" }}
                  >
                    &#8377;{row.orderAmount.toFixed(2)}
                  </TableCell>
                  <TableCell align="left">
                    {row.billingAddress && (
                      <AddressFormatter props={row.billingAddress} />
                    )}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                    {row.deliveryAddress && (
                      <AddressFormatter props={row.deliveryAddress} />
                    )}
                  </TableCell>
                  <TableCell>
                    <DateTimeComponent dateTime={row.createdAt} />
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "1px solid #e0e0e0" }}
                  >
                    <ChipComponent value={row.orderStatus || ""} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default OrderTable;
