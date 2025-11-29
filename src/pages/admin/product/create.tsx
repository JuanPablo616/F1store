import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    team: "",
    inStock: 0,
    imageUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/admin/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        toast.success("Producto creado correctamente");
        setForm({
          name: "",
          slug: "",
          description: "",
          price: 0,
          team: "",
          inStock: 0,
          imageUrl: ""
        });
      } else {
        toast.error("Error al crear producto");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900 text-white rounded mt-10">
      <h1 className="text-3xl font-bold mb-4">Crear Producto</h1>

      {/* Nombre */}
      <input
        name="name"
        placeholder="Nombre del producto"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-slate-800 rounded"
      />

      {/* Slug */}
      <input
        name="slug"
        placeholder="Slug (ej: gorra-mercedes-2024)"
        value={form.slug}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-slate-800 rounded"
      />

      {/* Descripción */}
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-slate-800 rounded"
      />

      {/* Precio */}
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-slate-800 rounded"
      />

      {/* Equipo */}
      <input
        name="team"
        placeholder="Equipo"
        value={form.team}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-slate-800 rounded"
      />

      {/* Stock */}
      <input
        type="number"
        name="inStock"
        placeholder="Cantidad en stock"
        value={form.inStock}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-slate-800 rounded"
      />

      {/* URL de Cloudinary */}
      <input
        name="imageUrl"
        placeholder="URL de imagen (Cloudinary)"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-slate-800 rounded"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold mt-4"
      >
        Crear producto
      </button>
    </div>
  );
}
