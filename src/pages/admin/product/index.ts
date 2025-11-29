import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/mongodb";
import { Product } from "@models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    try {
      const { name, slug, description, price, team, inStock, imageUrl } = req.body;

      if (!name || !slug || !description || !price || !team || !imageUrl) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      const existing = await Product.findOne({ slug }).lean();
      if (existing) {
        return res.status(400).json({ message: "Ya existe un producto con ese slug" });
      }

      const product = await Product.create({
        name,
        slug,
        description,
        price,
        team,
        inStock: inStock ?? 0,
        imageUrl
      });

      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al crear producto" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).end("Method Not Allowed");
}
