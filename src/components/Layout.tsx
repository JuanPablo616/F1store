import React from "react";
import Head from "next/head";
import Header  from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>F1 Store</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto w-full p-4">{children}</main>
        <footer className="border-t border-slate-800 py-4 text-center text-sm text-slate-400">
          F1 Store &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
};
