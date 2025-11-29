import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  // Aquí normalmente llamarías a PayPal para crear una orden
  const { total } = req.body;

  if (typeof total !== "number" || total <= 0) {
    return res.status(400).json({ message: "Invalid total" });
  }

  // Simulamos una respuesta:
  res.status(200).json({
    orderId: "PAYPAL_ORDER_ID_DEMO",
    status: "CREATED"
  });
}
