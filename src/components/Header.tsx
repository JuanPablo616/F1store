import Link from "next/link";
import { useCart } from "./CartContext";
import { useSession, signIn, signOut } from "next-auth/react";

export const Header: React.FC = () => {
  const { items } = useCart();
  const { data: session } = useSession();

  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-red-500 font-bold text-xl">F1</span>
          <span className="font-semibold">Store</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {count}
              </span>
            )}
          </Link>

          <Link href="/admin/product/create" className="text-sm text-slate-300">
            Admin
          </Link>

          {session ? (
            <button onClick={() => signOut()} className="text-sm text-slate-200">
              Salir ({session.user?.name})
            </button>
          ) : (
            <button onClick={() => signIn("google")} className="text-sm text-slate-200">
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
