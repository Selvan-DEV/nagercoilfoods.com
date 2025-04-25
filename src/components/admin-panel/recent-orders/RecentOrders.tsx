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
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  IOrderStatus,
  IRecentOrderProducts,
  IRecentOrders,
} from "@/app/(admin)/shop-management/model/ShopManagementModel";
import { NextPage } from "next";
import ChipComponent from "@/components/site-components/chip-component/ChipComponent";
import NoDataFound from "@/components/site-components/NoDataFound/NoDataFound";
import AddressFormatter from "@/shared/AddressComponent/AddressComponent";
import DateTimeComponent from "@/shared/StandaredDateTime/DateTime";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  getInvoiceBinaries,
  getOrdersByShopId,
  ordersExport,
} from "@/services/ShopManagement/ShopManagement";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import showErrorToast from "@/components/showErrorToast";

interface IPageProps {
  recentOrders: IRecentOrders[];
  pageTitle: string;
  shopId: number;
  orderStatuses: IOrderStatus[];
  onStatusChange: (payload: { orderId: number; orderStatusId: number }) => void;
}

const OrderTable: NextPage<IPageProps> = (props) => {
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);
  const { recentOrders, pageTitle, orderStatuses, onStatusChange } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<{
    [key: number]: HTMLElement | null;
  }>({});
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setAnchorEl((prev) => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleClose = (index: number) => {
    setAnchorEl((prev) => ({ ...prev, [index]: null }));
  };

  const handleOnStatusSelect = (
    selectedOrderStatusId: number,
    index: number
  ) => {
    handleClose(index);
    if (!selectedOrderStatusId || index < 0) {
      return;
    }

    const orderId = recentOrders[index].orderId;

    const payload = {
      orderId: orderId,
      orderStatusId: selectedOrderStatusId,
    };

    onStatusChange(payload);
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      const csvBlob = await ordersExport(selectedIds.join(","));
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

  const onDownload = async (orderId: number, index: number) => {
    if (!orderId) {
      return;
    }

    try {
      const pdfBlob = await getInvoiceBinaries(orderId);
      if (pdfBlob) {
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${orderId}.pdf`;
        link.click();
        handleClose(index);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "orderId",
      headerName: "#Order",
      flex: 0.5,
      minWidth: 100,
      display: "flex",
      align: "left",
      renderCell: ({ row }) => (
        <Link href={`/shop-management/orders/${row.orderId}`} passHref>
          <Typography color="primary" sx={{ cursor: "pointer" }}>
            #{row.orderId}
          </Typography>
        </Link>
      ),
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1.2,
      minWidth: 200,
      display: "flex",
      align: "left",
      renderCell: ({ row }) => (
        <Box>
          {row.products.map((product: IRecentOrderProducts, index: number) => (
            <Box key={index}>
              <Typography>{product.productName}</Typography>
              <Typography variant="body2" color="text.secondary">
                Qty - {product.orderQuantity}
              </Typography>
            </Box>
          ))}
        </Box>
      ),
    },
    {
      field: "orderAmount",
      headerName: "Price",
      flex: 0.6,
      minWidth: 120,
      display: "flex",
      align: "left",
      valueGetter: (value, row) => `Rs.${Number(row.orderAmount).toFixed(2)}`,
    },
    {
      field: "billingAddress",
      headerName: "Billing Address",
      flex: 1,
      minWidth: 180,
      display: "flex",
      align: "left",
      renderCell: ({ row }) =>
        row.billingAddress ? (
          <AddressFormatter props={row.billingAddress} />
        ) : (
          "-"
        ),
    },
    {
      field: "shipping",
      headerName: "Shipping Address",
      flex: 1,
      minWidth: 180,
      display: "flex",
      align: "left",
      renderCell: ({ row }) =>
        row.deliveryAddress ? (
          <AddressFormatter props={row.deliveryAddress} />
        ) : (
          "-"
        ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.8,
      minWidth: 150,
      display: "flex",
      align: "left",
      renderCell: ({ row }) => <DateTimeComponent dateTime={row.createdAt} />,
    },
    {
      field: "orderStatus",
      headerName: "Delivery Status",
      flex: 0.5,
      minWidth: 120,
      display: "flex",
      align: "left",
      renderCell: ({ row }) => <ChipComponent value={row.orderStatus || ""} />,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 0.5,
      minWidth: 120,
      display: "flex",
      align: "center",
      renderCell: (params) => {
        const sortedRowIds = params.api.getSortedRowIds();
        const index = sortedRowIds.indexOf(params.id);
        return (
          <Box
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={(event) => handleClick(event, index)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl[index]}
              open={Boolean(anchorEl[index])}
              onClose={() => handleClose(index)}
            >
              {(orderStatuses || []).map((option) => (
                <MenuItem
                  key={option.orderStatusId}
                  onClick={() =>
                    handleOnStatusSelect(option.orderStatusId, index)
                  }
                >
                  {option.orderStatusName}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={() => onDownload(Number(params.id), index)}>
                Download Invoice
              </MenuItem>
            </Menu>
          </Box>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 50 };

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
        {pageTitle === "New Orders" && (
          <LoadingButton
            variant="contained"
            onClick={handleExport}
            loading={loading}
            loadingPosition="start"
            disabled={loading || !selectedIds.length}
          >
            {loading ? "...loading" : "Export"}
          </LoadingButton>
        )}
      </Box>

      {!recentOrders || !recentOrders.length ? (
        <NoDataFound message="No Recent Orders" />
      ) : (
        <DataGrid
          rows={recentOrders}
          getRowId={(row) => row.orderId}
          getRowHeight={() => "auto"}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedIds(newSelection.slice());
          }}
          columnVisibilityModel={{
            action: pageTitle === "New Orders",
          }}
          rowSelectionModel={selectedIds}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 50, 100]}
          checkboxSelection={pageTitle === "New Orders"}
          sx={{
            border: 0,
            marginTop: "20px",
            "& .MuiDataGrid-cell": {
              alignItems: "center",
              paddingLeft: 1,
              paddingTop: 1,
              paddingBottom: 1,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "transparent",
            },
          }}
        />
      )}
    </Paper>
  );
};

export default OrderTable;
