import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(400).json({ error: "Only POST accepted" });

  const { amount } = req.body;

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

    const order = await fetch("https://sandbox.paypal.com", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      }),
    });

    const data = await order.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "PayPal error" });
  }
}
