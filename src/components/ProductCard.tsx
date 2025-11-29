import React from "react";
import { Card, CardContent } from "@mui/material";
import { IProduct } from "@models/Product";
import { useCart } from "./CartContext";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      productId: product._id.toString(),
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    });
  };

  return (
    <Card className="bg-slate-900 border border-slate-700">
      <CardContent>
        <div className="h-40 w-full mb-2 overflow-hidden rounded-lg bg-black">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <p className="text-sm text-slate-400">{product.team}</p>
        <p className="mt-2 text-red-400 font-bold">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAdd}
          className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-1.5 rounded"
        >
          Añadir al carrito
        </button>
      </CardContent>
    </Card>
  );
};
