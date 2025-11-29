import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../components/ProductCard";
import { CartProvider } from "../components/CartContext";
import { IProduct } from "../models/Product";

const product = {
  _id: "1",
  name: "Gorra Ferrari",
  slug: "gorra-ferrari",
  description: "Gorra oficial",
  price: 50,
  team: "Ferrari",
  imageUrl: "https://example.com/gorra.jpg",
  inStock: 10,
  createdAt: new Date(),
  updatedAt: new Date()
} as unknown as IProduct;

describe("ProductCard", () => {
  it("muestra el nombre del producto", () => {
    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>
    );

    expect(screen.getByText("Gorra Ferrari")).toBeInTheDocument();
  });
});
