import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@components/CartContext";
import { Layout } from "@components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </CartProvider>
    </SessionProvider>
  );
}
