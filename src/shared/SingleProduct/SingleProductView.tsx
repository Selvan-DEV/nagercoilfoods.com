import * as React from "react";
import Box from "@mui/material/Box";
import { NextPage } from "next";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { IProduct } from "@/models/IProduct";

interface ProductView {
  product: IProduct;
}

const SingleProductView: NextPage<ProductView> = (props) => {
  const { imageUrl } = props.product;

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="450"
                image={imageUrl}
                alt="Product 1"
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleProductView;
