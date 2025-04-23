import { ICoupon } from "@/app/(admin)/shop-management/model/ShopManagementModel";
import ChipComponent from "@/components/site-components/chip-component/ChipComponent";
import NoDataFound from "@/components/site-components/NoDataFound/NoDataFound";
import showErrorToast from "@/components/showErrorToast";
import { updateCouponStatus } from "@/services/ShopManagement/ShopManagement";
import ConfirmModal from "@/shared/ConfirmModal/ConfirmModal";
import DateTimeComponent from "@/shared/StandaredDateTime/DateTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CouponDrawerForm from "./CouponDrawerForm";

export default function CouponsComponent(props: {
  coupons: ICoupon[];
  getCoupons: (isRefresh: boolean) => void;
}) {
  const { coupons, getCoupons } = props;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<ICoupon | null>(null);
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

  const handleOnStatusSelect = (menu: string, row: ICoupon, index: number) => {
    handleClose(index);
    if (!menu || !row) {
      return;
    }

    switch (menu) {
      case "StatusUpdate":
        setSelectedRow(row);
        setConfirmModalOpen(true);
        break;
      case "Edit":
        setSelectedCouponId(row.id);
        setIsEdit(true);
        setDrawerOpen(true);
        break;

      default:
        break;
    }
  };

  const couponStatusUpdate = async (isOpen: boolean): Promise<void> => {
    const index = coupons.findIndex((x) => x.id === selectedRow?.id);
    if (!isOpen) {
      setSelectedRow(null);
      setConfirmModalOpen(false);
      return;
    }

    if (!selectedRow) {
      return;
    }

    const payload = { isActive: !selectedRow.isActive };
    try {
      const response = await updateCouponStatus(payload, selectedRow.id);
      if (response) {
        toast.success("Success");
        getCoupons(false);
        setSelectedRow(null);
        setConfirmModalOpen(false);
      }
    } catch (error) {
      showErrorToast(error);
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
          Coupons
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setIsEdit(false);
            setSelectedCouponId(null);
            setDrawerOpen(true);
          }}
        >
          Add Coupon
        </Button>
      </Box>

      {!coupons || !coupons.length ? (
        <NoDataFound message="No Coupons Found" />
      ) : (
        <TableContainer>
          <Table
            sx={{ minWidth: 650, borderCollapse: "collapse" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                  Code
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                  Value
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  Expiry On
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ borderBottom: "1px solid #e0e0e0" }}>
                    <Typography>{row.code}</Typography>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "1px solid #e0e0e0" }}
                  >
                    {row.value}
                  </TableCell>
                  <TableCell align="left">
                    <DateTimeComponent dateTime={row.expiryDate} />
                  </TableCell>
                  <TableCell>
                    <ChipComponent
                      value={row.isActive ? "Active" : "Inactive"}
                    />
                  </TableCell>
                  <TableCell>
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
                      <MenuItem
                        onClick={() =>
                          handleOnStatusSelect("StatusUpdate", row, index)
                        }
                      >
                        {row.isActive ? "Inactivate" : "Activate"}
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleOnStatusSelect("Edit", row, index)}
                      >
                        {"Edit"}
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ConfirmModal
        open={confirmModalOpen}
        onSubmit={(isOpen) => couponStatusUpdate(isOpen)}
        loading={false}
        message="Are you sure you want to change the Status of this Coupon?"
        title="Confirm"
      />

      <CouponDrawerForm
        open={drawerOpen}
        onClose={() => {
          setSelectedCouponId(null);
          setIsEdit(false);
          setDrawerOpen(false);
        }}
        isEdit={isEdit}
        couponId={selectedCouponId}
        getCoupons={getCoupons}
      />
    </Paper>
  );
}
