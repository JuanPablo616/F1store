import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="p-8 text-center text-red-500">
        No autorizado. Inicia sesión para continuar.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>

      <div className="space-y-2">
        <Link
          href="/admin/product/create"
          className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          ➕ Crear producto
        </Link>

        <Link
          href="/admin/products"
          className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          📦 Ver todos los productos
        </Link>
      </div>
    </div>
  );
}
