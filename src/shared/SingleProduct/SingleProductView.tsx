import * as React from "react";
import Box from "@mui/material/Box";
import { NextPage } from "next";
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IProduct } from "@/models/IProduct";

interface ProductView {
  product: IProduct;
}

const SingleProductView: NextPage<ProductView> = (props) => {
  const { imageUrl } = props.product;
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height={isMobile ? "250" : "600"}
                image={imageUrl}
                alt="Product 1"
                sx={{ objectFit: "inherit" }}
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleProductView;
