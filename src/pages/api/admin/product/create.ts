import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/mongodb";
import { Product } from "@models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  // CREAR PRODUCTO
  if (req.method === "POST") {
    try {
      const { name, slug, description, price, team, inStock, imageBase64 } = req.body;

      if (!name || !slug || !description || !price || !team || !inStock || !imageBase64) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const exists = await Product.findOne({ slug });
      if (exists) {
        return res.status(400).json({ message: "Este slug ya existe" });
      }

      const product = await Product.create({
        name,
        slug,
        description,
        price,
        team,
        inStock,
        imageUrl: imageBase64
      });

      return res.status(201).json({ message: "Producto creado", product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  return res.status(405).json({ message: "Método no permitido" });
}
