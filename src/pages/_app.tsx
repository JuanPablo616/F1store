import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@components/CartContext";
import { Layout } from "@components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";

// PayPal Provider
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          currency: "USD",
        }}
      >
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </CartProvider>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
