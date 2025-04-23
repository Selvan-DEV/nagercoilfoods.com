"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Grid,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import Link from "next/link";
import { IProduct } from "@/models/IProduct";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DateTimeComponent from "@/shared/StandaredDateTime/DateTime";

interface IPageProps {
  products: IProduct[];
  onActionUpdate: (payload: { productId: number; isPopular: number }) => void;
}

const ProductTable: NextPage<IPageProps> = (props) => {
  const { products, onActionUpdate } = props;
  const router = useRouter();
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

  const handleActionSelect = (selectedAction: string, index: number) => {
    if (!selectedAction || index < 0) {
      return;
    }

    const productId = products[index].id;

    const payload = {
      productId: productId || 0,
      isPopular: selectedAction === "Add as Popular" ? 1 : 0,
    };

    onActionUpdate(payload);
    handleClose(index);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item xs={4} sm={4}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/shop-management/products/add-product")}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="customer table">
          <TableHead>
            <TableRow>
              <TableCell>#SKU</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price (Selling Price)</TableCell>
              <TableCell>Qty (R/T)</TableCell>
              <TableCell>Added Date</TableCell>
              <TableCell>Added as Popular</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href={`/shop-management/products/${product.id}/edit`}>
                    <Typography color="primary" sx={{ fontWeight: 500 }}>
                      #{product.sku}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell sx={{ maxWidth: 150 }}>
                  <Tooltip title={product.productName} arrow>
                    <Typography
                      noWrap
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {product.productName}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>
                  ₹{product.price}
                  <Typography
                    component="span"
                    sx={{
                      textDecoration: "line-through",
                      fontSize: 12,
                      marginLeft: 1,
                      color: "gray",
                    }}
                  >
                    {product.discountPrice ? `₹${product.price}` : ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  {product.productQuantity} / {product.productQuantity}
                </TableCell>
                <TableCell>
                  <DateTimeComponent dateTime={product.createdAt || ""} />
                </TableCell>

                <TableCell>{product.isPopular ? "Yes" : "No"}</TableCell>

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
                    {["Add as Popular", "Remove Popular"].map((option) => (
                      <MenuItem
                        key={option}
                        onClick={() => handleActionSelect(option, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
