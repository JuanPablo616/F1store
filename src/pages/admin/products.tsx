import Link from "next/link";
import { GetServerSideProps } from "next";
import { connectDB } from "../../lib/mongodb";
import { Product } from "../../models/Product";

export default function AdminProductsPage({ products }: any) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">Nombre</th>
            <th className="p-2">Equipo</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((prod: any) => (
            <tr key={prod._id} className="border-b border-gray-800">
              <td className="p-2">{prod.name}</td>
              <td className="p-2">{prod.team}</td>
              <td className="p-2">${prod.price}</td>
              <td className="p-2">{prod.inStock}</td>
              <td className="p-2 space-x-2">
                <Link
                  href={`/admin/product/${prod._id}`}
                  className="px-3 py-1 bg-yellow-600 rounded text-white"
                >
                  Editar
                </Link>

                <Link
                  href={`/api/admin/product/delete?id=${prod._id}`}
                  className="px-3 py-1 bg-red-600 rounded text-white"
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        className="mt-4 inline-block bg-gray-600 px-4 py-2 rounded text-white"
        href="/admin"
      >
        ← Volver
      </Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await connectDB();
  const products = await Product.find().lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
