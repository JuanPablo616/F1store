import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface FormValues {
  name: string;
  slug: string;
  description: string;
  price: number;
  team: string;
  inStock: number;
  imageFile: FileList;
}

const schema = yup.object({
  name: yup.string().required("Nombre requerido"),
  slug: yup.string().required("Slug requerido"),
  description: yup.string().required("Descripción requerida"),
  price: yup
    .number()
    .typeError("Debe ser número")
    .required("Precio requerido")
    .min(0),
  team: yup.string().required("Equipo requerido"),
  inStock: yup
    .number()
    .typeError("Debe ser número")
    .required("Stock requerido")
    .min(0)
});

export default function CreateProductPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema, { stripUnknown: true })
  });

  if (!session) {
    return <p>Debes iniciar sesión para ver esta página.</p>;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);

      const file = data.imageFile?.[0];
      if (!file) {
        toast.error("Debes subir una imagen");
        return;
      }

      const base64 = await toBase64(file);

      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          price: Number(data.price),
          inStock: Number(data.inStock),
          imageBase64: base64
        })
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || "Error creando producto");
      }

      toast.success("Producto creado correctamente");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear producto F1</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Nombre</label>
          <input className="border w-full p-2 bg-slate-900" {...register("name")} />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label>Slug</label>
          <input className="border w-full p-2 bg-slate-900" {...register("slug")} />
          <p className="text-red-500 text-sm">{errors.slug?.message}</p>
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            className="border w-full p-2 bg-slate-900"
            {...register("description")}
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div>
          <label>Precio</label>
          <input
            type="number"
            className="border w-full p-2 bg-slate-900"
            {...register("price")}
          />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>

        <div>
          <label>Equipo</label>
          <input className="border w-full p-2 bg-slate-900" {...register("team")} />
          <p className="text-red-500 text-sm">{errors.team?.message}</p>
        </div>

        <div>
          <label>Stock</label>
          <input
            type="number"
            className="border w-full p-2 bg-slate-900"
            {...register("inStock")}
          />
          <p className="text-red-500 text-sm">{errors.inStock?.message}</p>
        </div>

        <div>
          <label>Imagen</label>
          <input type="file" accept="image/*" {...register("imageFile")} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Guardando..." : "Crear producto"}
        </button>
      </form>
    </div>
  );
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
