import ProductViewPage from "@/components/site-components/single-product/product";
import { IProduct } from "@/models/IProduct";
import { getProductByUniqueName } from "@/services/ProductManagement/ProductsService";
import { Metadata } from "next";

// 👇 Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ productName: string }>;
}): Promise<Metadata> {
  try {
    const product = await getProductByUniqueName((await params).productName);

    if (product) {
      return {
        title: product.metaTitle || product.productName || "Nagercoil Foods",
        description:
          product.metaDescription ||
          `Buy ${product.productName} online at NagercoilFoods.com – authentic snacks, chips, mixtures and more.`,
      };
    }
  } catch (error) {
    console.error("Error fetching metadata for product:", error);
  }

  // fallback (if product fails to load)
  return {
    title: "Online Store – Nagercoil Snacks & Chips",
    description:
      "Buy authentic Nagercoil snacks, chips, and mixtures online at NagercoilFoods.com.",
  };
}

export default async function Product({
  params,
}: {
  params: Promise<{ productName: string }>;
}) {
  let product: IProduct | null = null;

  try {
    product = await getProductByUniqueName((await params).productName);
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  return <>{product && <ProductViewPage product={product} />}</>;
}
