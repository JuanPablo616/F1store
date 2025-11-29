import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/mongodb";
import { Product } from "@models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ message: "ID inválido" });
  }

  if (req.method === "GET") {
    const product = await Product.findById(id).lean();
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json(product);
  }

  if (req.method === "PUT") {
    try {
      const { name, slug, description, price, team, inStock, imageUrl } = req.body;

      const updated = await Product.findByIdAndUpdate(
        id,
        { name, slug, description, price, team, inStock, imageUrl },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar producto" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar producto" });
    }
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).end("Method Not Allowed");
}
