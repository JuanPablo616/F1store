import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/mongodb";
import { Product } from "@models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== "PUT") return res.status(405).end();

  const data = req.body;
  await Product.findByIdAndUpdate(data._id, data);  

  return res.status(200).json({ message: "updated" });
}
