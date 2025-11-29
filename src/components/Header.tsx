import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-[#0A0B0D] border-b border-red-600 shadow-xl racing-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        
        {/* LOGO F1 */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-red-600 font-extrabold text-3xl tracking-tighter group-hover:tracking-widest transition-all duration-300">
            F1
          </span>
          <span className="text-white font-semibold text-xl">
            Store
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="nav-link">
            Inicio
          </Link>

          <Link href="/#productos" className="nav-link">
            Productos
          </Link>

          {session && (
            <Link href="/admin" className="nav-link text-red-400">
              Admin
            </Link>
          )}
        </nav>

        {/* DERECHA */}
        <div className="flex items-center gap-4">
          
          {/* Carrito */}
          <Link href="/cart" className="relative">
            <ShoppingCartOutlinedIcon
              style={{ fontSize: "28px", color: "white" }}
              className="hover:text-red-600 transition"
            />
          </Link>

          {/* Login / Logout */}
          {!session ? (
            <Link
              href="/auth/login"
              className="px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-semibold"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => signOut()}
              className="px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-semibold"
            >
              Salir ({session.user?.name?.split(" ")[0]})
            </button>
          )}
        </div>
      </div>

      {/* LÍNEA RACING ANIMADA */}
      <div className="racing-line"></div>
    </header>
  );
}
