import React from "react";
import { IProduct } from "@models/Product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: IProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return <p>No hay productos.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(p => (
        <ProductCard key={p._id.toString()} product={p} />
      ))}
    </div>
  );
};
