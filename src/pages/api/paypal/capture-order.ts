import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(400).json({ error: "Only POST accepted" });

  const { orderID } = req.body;

  try {
    const auth = await fetch("https://sandbox.paypal.com", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const { access_token } = await auth.json();

    const response = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "PayPal error" });
  }
}
