import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/mongodb";
import { Product } from "@models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const id = req.query.id;
  await Product.findByIdAndDelete(id);

  return res.redirect("/admin/products");
}
