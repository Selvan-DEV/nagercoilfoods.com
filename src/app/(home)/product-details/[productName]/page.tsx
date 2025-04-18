import ProductViewPage from "@/components/site-components/single-product/product";
import { IProduct } from "@/models/IProduct";
import { getProductByUniqueName } from "@/services/ProductManagement/ProductsService";

export default async function Product({
  params,
}: {
  params: Promise<{ productName: string }>;
}) {
  const { productName } = await params;
  let product: IProduct | null = null;

  try {
    product = await getProductByUniqueName(productName);
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  return <>{product && <ProductViewPage product={product} />}</>;
}
