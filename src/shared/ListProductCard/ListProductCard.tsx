import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import Rupee from "../Rupee/Rupee";
import { CardActionArea } from "@mui/material";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import Link from "next/link";
import { IProduct } from "@/models/IProduct";

interface ProductView {
  product: IProduct;
  addOrUpdateProductToCart: (cartPayload: IProduct) => void;
}

const ListProductCard: NextPage<ProductView> = (props) => {
  const { id, productName, price, imageUrl, description, uniqueName } =
    props.product;
  const { addOrUpdateProductToCart } = props;

  const addToCart = (): void => {
    addOrUpdateProductToCart(props.product);
  };

  return (
    <Card sx={{ maxWidth: 345 }} key={id} elevation={0}>
      <CardActionArea>
        <Link href={`/${uniqueName}`}>
          <CardMedia
            sx={{ height: 265 }}
            image={imageUrl}
            title={productName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productName}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <Rupee rupee={price} weight="1kg" />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          endIcon={<AddShoppingCartTwoToneIcon />}
          onClick={() => addToCart()}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ListProductCard;
