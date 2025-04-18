import ProductCardBeta from "@/components/site-components/product/ProductCard";
import { IProduct } from "@/models/IProduct";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React from "react";

interface IPageProps {
  products: IProduct[];
  loading: boolean;
  fetchProducts: () => void;
}

const ProductSearchResults: NextPage<IPageProps> = (props) => {
  const { products, loading, fetchProducts } = props;
  const router = useRouter();

  return (
    <>
      {!loading &&
        products.length > 0 &&
        products.map((product) => (
          <ProductCardBeta
            key={product.id}
            product={product}
            fetchProducts={fetchProducts}
            onClick={() =>
              router.push(`/product-details/${product.uniqueName}`)
            }
          />
        ))}
    </>
  );
};

export default ProductSearchResults;
