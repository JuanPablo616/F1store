import { GetServerSideProps } from "next";
import { connectDB } from "@lib/mongodb";
import { Product } from "@models/Product";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditProduct({ product }: any) {
  const [form, setForm] = useState(product);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProduct = async () => {
    const res = await fetch("/api/admin/product/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) toast.success("Producto actualizado");
    else toast.error("Error actualizando");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Editar producto</h1>

      <input
        className="border p-2 w-full bg-slate-900"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full bg-slate-900"
        name="price"
        value={form.price}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full bg-slate-900"
        name="team"
        value={form.team}
        onChange={handleChange}
      />

      <textarea
        className="border p-2 w-full bg-slate-900"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <button
        className="bg-yellow-600 text-white px-4 py-2 rounded"
        onClick={updateProduct}
      >
        Guardar cambios
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connectDB();
  const id = ctx.params?.id;

  const product = await Product.findById(id).lean();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};
