import type { NextApiRequest, NextApiResponse } from "next";
import { sendBasicMail } from "@lib/mailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const { to } = req.body;
  if (!to) return res.status(400).json({ message: "Missing 'to'" });

  await sendBasicMail(to, "Test F1 Store", "<p>Este es un correo de prueba.</p>");
  res.status(200).json({ ok: true });
}
