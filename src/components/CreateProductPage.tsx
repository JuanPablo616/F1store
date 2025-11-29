import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    team: "",
    inStock: 0,
    imageUrl: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/admin/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      toast.success("Producto creado");
    } else {
      toast.error("Error al crear producto");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900 text-white rounded">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>

      <input
        name="name"
        placeholder="Nombre"
        className="w-full mb-2 p-2 bg-slate-800 rounded"
        onChange={handleChange}
      />

      <input
        name="slug"
        placeholder="Slug"
        className="w-full mb-2 p-2 bg-slate-800 rounded"
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Descripción"
        className="w-full mb-2 p-2 bg-slate-800 rounded"
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Precio"
        className="w-full mb-2 p-2 bg-slate-800 rounded"
        onChange={handleChange}
      />

      <input
        name="team"
        placeholder="Equipo"
        className="w-full mb-2 p-2 bg-slate-800 rounded"
        onChange={handleChange}
      />

      <input
        type="number"
        name="inStock"
        placeholder="Stock"
        className="w-full mb-2 p-2 bg-slate-800 rounded"
        onChange={handleChange}
      />

      <input
        name="imageUrl"
        placeholder="URL de imagen (Cloudinary)"
        className="w-full mb-2 p-2 bg-slate-800 rounded"
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-red-600 hover:bg-red-700 py-2 mt-4 rounded"
      >
        Crear Producto
      </button>
    </div>
  );
}
