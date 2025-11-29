import React from "react";
import { Card, CardContent } from "@mui/material";
import { IProduct } from "@models/Product";
import { useCart } from "./CartContext";

interface Props {
  product: IProduct;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addItem } = useCart();

  const teamColors: Record<string, string> = {
    Ferrari: "#D2001A",
    Mercedes: "#00A19B",
    "Red Bull": "#1E2A78",
    default: "#e11d48",
  };

  const glow = teamColors[product.team] || teamColors.default;

  const handleAdd = () => {
    addItem({
      productId: product._id.toString(),
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  return (
    <Card
      className="relative bg-[#111216] border border-slate-700 rounded-xl overflow-hidden shadow-xl transition-all duration-300 card"
      style={{
        boxShadow: `0 0 18px ${glow}50`,
      }}
    >
      {/* Imagen */}
      <div className="h-52 w-full overflow-hidden group relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div
          className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide"
          style={{
            backgroundColor: glow,
            color: "white",
          }}
        >
          {product.team}
        </div>
      </div>

      <CardContent className="p-4">
        <h2 className="font-extrabold text-lg tracking-wide">
          {product.name}
        </h2>

        <p className="text-slate-400 text-sm mt-1">Colección 2024</p>

        <p
          className="mt-3 text-2xl font-extrabold"
          style={{
            color: glow,
          }}
        >
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAdd}
          className="w-full mt-4 py-2 rounded-md font-bold tracking-wider text-white transition-all duration-300"
          style={{
            backgroundColor: glow,
          }}
        >
          Añadir al carrito
        </button>
      </CardContent>
    </Card>
  );
};
