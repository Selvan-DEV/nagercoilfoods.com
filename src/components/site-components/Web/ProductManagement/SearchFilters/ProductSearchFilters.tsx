"use client";

import {
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { ICategoriesWithProducts } from "@/models/IProduct";

interface IPageProps {
  categories: ICategoriesWithProducts[];
  priceRange: number[] | number;
  setPriceRange: (priceRange: number[] | number) => void;
}

const ProductSearchFilters: NextPage<IPageProps> = (props) => {
  const { categories, setPriceRange, priceRange } = props;
  const router = useRouter();

  const handlePriceChange = (_event: any, newValue: number[] | number) => {
    setPriceRange(newValue);
  };

  const onProductSelect = (
    selectedCategory: string,
    selectedProduct: string
  ): void => {
    const productName = selectedProduct.split(" ").join("_");
    const categoryName = selectedCategory.split(" ").join("_");
    router.push(`/${categoryName.toLowerCase()}/${productName.toLowerCase()}`);
  };

  return (
    <>
      {categories.length > 0 && (
        <Grid item xs={12} md={3}>
          {/* Categories */}
          <Box>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography variant="body1">Products (10)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6" gutterBottom>
                  Filter by price
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={10}
                  max={1000}
                />
                <Typography>
                  Rs.{(priceRange as number[])[0]} - Rs
                  {(priceRange as number[])[1]}
                </Typography>

                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {categories.map((category) => {
                    const labelId = `checkbox-list-label-${category.categoryId}`;

                    return (
                      <Box key={category.categoryId}>
                        <ListSubheader>{category.categoryName}</ListSubheader>
                        {category.products.map((x, index) => (
                          <ListItem
                            key={index}
                            disablePadding
                            sx={{ mx: "10px" }}
                          >
                            <ListItemButton
                              role={undefined}
                              dense
                              onClick={() =>
                                onProductSelect(category.categoryName, x)
                              }
                            >
                              <ListItemText id={labelId} primary={x} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </Box>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default ProductSearchFilters;
