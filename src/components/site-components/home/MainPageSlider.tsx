import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Slider from "react-slick";

const Images = [
  {
    id: 1,
    src: "/images/bg/banner-1.jpg",
    alt: "Imhttpsage 1",
    title: "Lamborghini Huracan Performante",
    description:
      "The Huracán Performante has reworked the concept of super sports cars and taken the notion of performance to levels never seen before.",
  },
  {
    id: 2,
    src: "/images/bg/banner-2.jpg",
    alt: "Image 2 ",
    title: "Porsche 911 Turbo S",
    description:
      "This Turbo S variant comes with an engine putting out 641 bhp @ 6750 rpm and 800 Nm @ 2500 rpm of max power and max torque respectively.",
  },
  {
    id: 3,
    src: "/images/bg/banner-3.jpg",
    alt: "Image 3 ",
    title: "Porsche 911 Turbo S",
    description:
      "This Turbo S variant comes with an engine putting out 641 bhp @ 6750 rpm and 800 Nm @ 2500 rpm of max power and max torque respectively.",
  },
];

function CustomPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      style={{
        ...style,
        display: "block",
        color: "white",
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
      onClick={onClick}
    ></Box>
  );
}

function CustomNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      style={{
        ...style,
        display: "block",
        color: "white",
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
      onClick={onClick}
    ></Box>
  );
}

export default function MainPageSlider() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item md={8} xs={12} sm={6}>
          <Slider {...sliderSettings}>
            {Images.map((item) => (
              <Card elevation={0} key={item.id}>
                <CardMedia
                  component="img"
                  height={isMobile ? "250px" : "510"}
                  image={item.src}
                  alt="slider-img"
                  sx={{ objectFit: "fill" }}
                />
              </Card>
            ))}
          </Slider>
        </Grid>
        <Grid item md={4} xs={12} sm={6}>
          <Box>
            <Card elevation={0}>
              <CardMedia
                component="img"
                height="250px"
                image={"/images/bg/sm-banner-1.jpg"}
                alt="slider-img"
                sx={{ objectFit: "fill" }}
              />
            </Card>

            <Card elevation={0} sx={{ mt: "10px" }}>
              <CardMedia
                component="img"
                height="250px"
                image={"/images/bg/sm-banner-2.jpg"}
                alt="slider-img"
                sx={{ objectFit: "fill" }}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
