import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/mongodb";
import { Product } from "@models/Product";
import cloudinary from "@lib/cloudinary";
import * as yup from "yup";

const productSchema = yup.object({
  name: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().min(0),
  team: yup.string().required(),
  inStock: yup.number().required().min(0)
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb"
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { imageBase64, ...data } = req.body;

      await productSchema.validate(data);

      if (!imageBase64) {
        return res.status(400).json({ message: "Image is required" });
      }

      const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
        folder: "f1-store/products"
      });

      const newProduct = await Product.create({
        ...data,
        price: Number(data.price),
        inStock: Number(data.inStock),
        imageUrl: uploadResponse.secure_url
      });

      res.status(201).json(newProduct);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message || "Error creating product" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
