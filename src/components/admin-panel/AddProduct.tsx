"use client";

import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import SpinnerComponent from "@/components/site-components/page-loader/SpinnerComponent";
import showErrorToast, { ErrorResponse } from "@/components/showErrorToast";
import { ICategories, IProduct } from "@/models/IProduct";
import { IUserData, ILoginResponse } from "@/models/UserManagement/IUserData";
import {
  createProduct,
  updateProduct,
  getCategoriesByShopId,
  getProductByShopIdAndProductId,
} from "@/services/ShopManagement/ShopManagement";
import { getSessionStorageItem } from "@/shared/SharedService/StorageService";
import LoadingButton from "@mui/lab/LoadingButton";

const ProductForm = (props: { productId?: number }) => {
  const router = useRouter();
  const { productId } = props;
  const [loading, setLoading] = useState(false);
  const [shopData, setShopData] = useState<IUserData | null>(null);
  const [categories, setCategories] = useState<ICategories[]>([]);

  const formik = useFormik({
    initialValues: {
      sku: "",
      productName: "",
      description: "",
      productQuantity: "",
      price: "",
      offerPrice: "",
      offerStartDate: null as Dayjs | null,
      offerEndDate: null as Dayjs | null,
      metaTitle: "",
      metaDescription: "",
      imageUrl: "",
      weight: "",
      brand: "Nilas Snacks",
      brandId: 1,
      stockStatus: "",
      categoryId: "",
      ingredients: "",
      variants: [
        {
          variantName: "",
          additionalPrice: 0,
          stock: 0,
        },
      ],
    },
    validationSchema: Yup.object().shape({
      categoryId: Yup.string().required("Category is requried"),
      sku: Yup.string().required("SKU is required"),
      productName: Yup.string().required("Product Name is required"),
      description: Yup.string().required("Description is required"),
      productQuantity: Yup.number()
        .required("Quantity is required")
        .min(1, "Quantity must be at least 1"),
      price: Yup.number()
        .required("Original Price is required")
        .min(0, "Price must be a positive number"),
      offerPrice: Yup.number().min(0, "Offer Price must be a positive number"),
      metaTitle: Yup.string().required("Meta Title is required"),
      metaDescription: Yup.string().required("Meta Description is required"),
      imageUrl: Yup.string().required("Product image URL is required"),
      weight: Yup.string().min(0, "Weight must be positive"),
      variants: Yup.array().of(
        Yup.object().shape({
          variantName: Yup.string().required("Variant name is required"),
          additionalPrice: Yup.number().min(0, "Must be >= 0"),
          stock: Yup.number().min(0, "Must be >= 0"),
        })
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formValues = values as unknown as IProduct;
      formValues.shopId = shopData?.shopId || 0;
      formValues.visibility = "yes";
      formValues.uniqueName = formValues.productName
        .trim()
        .split(" ")
        .join("-")
        .toLowerCase();
      try {
        if (!productId) {
          const response = await createProduct(formValues);
          if (response && response.id > 0) {
            toast.success("Sucess");
            router.back();
          }
        } else {
          const response = await updateProduct(formValues);
          if (response) {
            toast.success("Sucess");
            router.back();
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const storedData = getSessionStorageItem(
      "adminData"
    ) as ILoginResponse | null;

    if (storedData && storedData.user) {
      setShopData(storedData.user);
    }
  }, []);

  const fetchCategories = useCallback(async (): Promise<void> => {
    if (!shopData?.shopId) return;

    setLoading(true);
    try {
      const response = await getCategoriesByShopId(shopData.shopId);
      setCategories(response);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      showErrorToast(axiosError);
    } finally {
      setLoading(false);
    }
  }, [shopData?.shopId]);

  useEffect(() => {
    if (shopData?.shopId) {
      fetchCategories();
    }
  }, [shopData?.shopId, fetchCategories]);

  const fetchProductById = useCallback(async (): Promise<void> => {
    if (!shopData?.shopId) return;

    setLoading(true);
    try {
      const response = await getProductByShopIdAndProductId(
        shopData?.shopId,
        Number(productId)
      );
      if (response) {
        const product = response as any;
        formik.setValues({
          ...product,
          offerStartDate: dayjs(product.offerStartDate),
          offerEndDate: dayjs(product.offerEndDate),
          ingredients: product.ingredients ? product.ingredients : "",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      showErrorToast(axiosError);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, shopData?.shopId]);

  useEffect(() => {
    if (shopData?.shopId && productId) {
      fetchProductById();
    }
  }, [shopData?.shopId, fetchProductById, productId]);

  if (!shopData) {
    return <SpinnerComponent />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
          {productId ? "Update" : "Add Product"}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="productName"
                label="Product Name"
                required
                fullWidth
                value={formik.values.productName}
                onChange={formik.handleChange}
                error={
                  formik.touched.productName &&
                  Boolean(formik.errors.productName)
                }
                helperText={
                  formik.touched.productName && formik.errors.productName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="categoryId"
                label="Category"
                required
                fullWidth
                value={formik.values.categoryId}
                onChange={formik.handleChange}
              >
                {categories.map((category) => (
                  <MenuItem
                    value={category.categoryId}
                    key={category.categoryId}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                required
                fullWidth
                multiline
                minRows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="ingredients"
                label="Ingredients"
                fullWidth
                multiline
                minRows={3}
                value={formik.values.ingredients}
                onChange={formik.handleChange}
                error={
                  formik.touched.ingredients &&
                  Boolean(formik.errors.ingredients)
                }
                helperText={
                  formik.touched.ingredients && formik.errors.ingredients
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="productQuantity"
                label="Quantity"
                type="number"
                required
                fullWidth
                value={formik.values.productQuantity}
                onChange={formik.handleChange}
                error={
                  formik.touched.productQuantity &&
                  Boolean(formik.errors.productQuantity)
                }
                helperText={
                  formik.touched.productQuantity &&
                  formik.errors.productQuantity
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Original Price"
                type="number"
                required
                fullWidth
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="offerPrice"
                label="Offer Price"
                type="number"
                fullWidth
                value={formik.values.offerPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.offerPrice && Boolean(formik.errors.offerPrice)
                }
                helperText={
                  formik.touched.offerPrice && formik.errors.offerPrice
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Offer Start Date"
                value={formik.values.offerStartDate}
                onChange={(value) =>
                  formik.setFieldValue("offerStartDate", value)
                }
                minDate={dayjs()}
                maxDate={dayjs(formik.values.offerEndDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error:
                      formik.touched.offerStartDate &&
                      Boolean(formik.errors.offerStartDate),
                    helperText:
                      formik.touched.offerStartDate &&
                      formik.errors.offerStartDate,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Offer End Date"
                value={formik.values.offerEndDate}
                onChange={(value) =>
                  formik.setFieldValue("offerEndDate", value)
                }
                minDate={dayjs(formik.values.offerStartDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error:
                      formik.touched.offerEndDate &&
                      Boolean(formik.errors.offerEndDate),
                    helperText:
                      formik.touched.offerEndDate && formik.errors.offerEndDate,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="metaTitle"
                label="Meta Title"
                fullWidth
                value={formik.values.metaTitle}
                onChange={formik.handleChange}
                error={
                  formik.touched.metaTitle && Boolean(formik.errors.metaTitle)
                }
                helperText={formik.touched.metaTitle && formik.errors.metaTitle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="metaDescription"
                label="Meta Description"
                fullWidth
                value={formik.values.metaDescription}
                onChange={formik.handleChange}
                error={
                  formik.touched.metaDescription &&
                  Boolean(formik.errors.metaDescription)
                }
                helperText={
                  formik.touched.metaDescription &&
                  formik.errors.metaDescription
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="imageUrl"
                label="Product Image URL"
                fullWidth
                required
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                error={
                  formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
                }
                helperText={formik.touched.imageUrl && formik.errors.imageUrl}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="weight"
                label="Weight (g)"
                fullWidth
                value={formik.values.weight}
                onChange={formik.handleChange}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="brand"
                label="Brand"
                fullWidth
                value={formik.values.brand}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="stockStatus"
                label="Stock Status"
                fullWidth
                value={formik.values.stockStatus}
                onChange={formik.handleChange}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="in_stock">In Stock</MenuItem>
                <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                <MenuItem value="backordered">Pre Order</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="sku"
                label="SKU"
                required
                fullWidth
                disabled={!!productId}
                value={formik.values.sku}
                onChange={formik.handleChange}
                error={formik.touched.sku && Boolean(formik.errors.sku)}
                helperText={formik.touched.sku && formik.errors.sku}
              />
            </Grid>
            {/* Variant Fields */}
            <Grid item xs={12}>
              <Typography variant="h6">Variants</Typography>
            </Grid>
            <Grid item xs={12}>
              {formik.values.variants.map((variant, index) => {
                const variantErrors = formik.errors.variants as FormikErrors<
                  {
                    variantName: string;
                    additionalPrice: number;
                    stock: number;
                  }[]
                >;

                const variantTouched = formik.touched.variants?.[index];

                return (
                  <Grid item xs={12} key={index}>
                    <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Variant Name"
                          name={`variants[${index}].variantName`}
                          value={variant.variantName}
                          onChange={formik.handleChange}
                          fullWidth
                          error={
                            variantTouched?.variantName &&
                            Boolean(variantErrors?.[index]?.variantName)
                          }
                          helperText={variantTouched?.variantName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Additional Price"
                          type="number"
                          name={`variants[${index}].additionalPrice`}
                          value={variant.additionalPrice}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Stock"
                          type="number"
                          name={`variants[${index}].stock`}
                          value={variant.stock}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        display="flex"
                        alignItems="center"
                      >
                        <IconButton
                          color="error"
                          onClick={() => {
                            const newVariants = [...formik.values.variants];
                            newVariants.splice(index, 1);
                            formik.setFieldValue("variants", newVariants);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                onClick={() =>
                  formik.setFieldValue("variants", [
                    ...formik.values.variants,
                    { variantName: "", additionalPrice: 0, stock: 0 },
                  ])
                }
              >
                {"Add Variant"}
              </Button>
            </Grid>
          </Grid>
          <Box mt={4}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
            >
              {loading ? "...loading" : !productId ? "Submit" : "Update"}
            </LoadingButton>
          </Box>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default ProductForm;
