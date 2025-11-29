import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/mongodb";
import { Product } from "@models/Product";
import { sendBasicMail } from "@lib/mailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Este endpoint lo puedes llamar con un CRON externo (ej: cron-job.org o vercel cron)
  await connectDB();

  const productsCount = await Product.countDocuments();
  const html = `<p>Reporte diario F1 Store:</p><p>Total de productos: ${productsCount}</p>`;

  const adminMail = process.env.EMAIL_USER;
  if (!adminMail) {
    return res.status(500).json({ message: "EMAIL_USER not configured" });
  }

  await sendBasicMail(adminMail, "Reporte diario F1 Store", html);

  res.status(200).json({ ok: true });
}
