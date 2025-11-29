export default function Home() {
  return (
    <div className="text-center py-20 px-4">

      {/* HERO */}
      <h1 className="text-5xl font-extrabold text-red-600 drop-shadow mb-6">
        Bienvenido a F1 Store
      </h1>

      <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
        La mejor tienda online de productos oficiales de Fórmula 1.
        Encuentra camisetas, gorras, accesorios y coleccionables de tus equipos favoritos.
      </p>


      {/* CTA */}
      <a
        href="/store"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-lg transition"
      >
        Ver Tienda
      </a>
    </div>
  );
}
