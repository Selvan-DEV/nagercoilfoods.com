"use client";

import { Typography, Box, Container } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCardBeta from "../product/ProductCard";
import { useRouter } from "next/navigation";
import { IProduct } from "@/models/IProduct";
import { getPopularProducts } from "@/services/ProductManagement/ProductsService";

export default function TopSaleSlider() {
  const router = useRouter();
  const topSaleSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768, // Mobile devices width
        settings: {
          slidesToShow: 1, // Show 1 slide at a time in mobile view
        },
      },
    ],
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  const getTopSaleProducts = useCallback(async () => {
    try {
      setLoading(true);
      const products = await getPopularProducts();
      setLoading(false);
      if (products && products.length) {
        setProducts(products.slice(0, 4));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTopSaleProducts();
  }, [getTopSaleProducts]);

  return (
    <Box
      sx={{
        padding: "50px 0 70px 0",
        marginTop: "50px",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"row"}
        marginBottom="50px"
      >
        <Typography variant="h5" component="div" gutterBottom>
          Top Sale of the Month
        </Typography>
      </Box>
      <Container>
        <Slider {...topSaleSettings}>
          {products.map((product) => (
            <ProductCardBeta
              product={product}
              key={product.id}
              onClick={() =>
                router.push(`/product-details/${product.uniqueName}`)
              }
            />
            // <Card
            //   elevation={1}
            //   key={product.id}
            //   sx={{ minHeight: "400px", maxHeight: "400px" }}
            // >
            //   <CardMedia
            //     component="img"
            //     height="250px"
            //     image={product.src}
            //     alt="Product 1"
            //   />
            //   <CardContent>
            //     <Typography variant="h6" component="div">
            //       {product.title}
            //     </Typography>
            //     <Typography variant="body2">£10.00</Typography>
            //   </CardContent>
            // </Card>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}
