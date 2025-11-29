import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/mongodb";
import { Product } from "@models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const {
        page = "1",
        limit = "9",
        team,
        minPrice,
        maxPrice,
        q
      } = req.query;

      const pageNum = parseInt(page as string, 10) || 1;
      const limitNum = parseInt(limit as string, 10) || 9;

      const filter: Record<string, unknown> = {};

      if (team) filter.team = team;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) (filter.price as any).$gte = Number(minPrice);
        if (maxPrice) (filter.price as any).$lte = Number(maxPrice);
      }

      if (q) {
        filter.name = { $regex: q, $options: "i" };
      }

      const [products, total] = await Promise.all([
        Product.find(filter)
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum)
          .sort({ createdAt: -1 }),
        Product.countDocuments(filter)
      ]);

      res.status(200).json({
        products,
        pagination: {
          total,
          page: pageNum,
          pages: Math.ceil(total / limitNum)
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching products" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end("Method Not Allowed");
  }
}
