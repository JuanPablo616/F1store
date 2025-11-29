import type { GetServerSideProps } from "next";
import { ProductList } from "@components/ProductList";
import { connectDB } from "@lib/mongodb";
import { Product, IProduct } from "@models/Product";

interface HomeProps {
  products: IProduct[];
  page: number;
  pages: number;
  team?: string | null;
  q?: string | null;
}

export default function Home({ products, page, pages, team, q }: HomeProps) {
  const currentTeam = team ?? "";
  const currentQ = q ?? "";

  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    if (currentTeam) params.set("team", currentTeam);
    if (currentQ) params.set("q", currentQ);
    return `/?${params.toString()}`;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-2">F1 Store</h1>

      <form method="GET" className="flex flex-wrap gap-2 mb-4">
        <input
          name="q"
          placeholder="Buscar producto"
          defaultValue={currentQ}
          className="border border-slate-700 rounded px-2 py-1 bg-slate-900"
        />
        <select
          name="team"
          defaultValue={currentTeam}
          className="border border-slate-700 rounded px-2 py-1 bg-slate-900"
        >
          <option value="">Todos los equipos</option>
          <option value="Ferrari">Ferrari</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Red Bull">Red Bull</option>
          <option value="McLaren">McLaren</option>
        </select>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Filtrar
        </button>
      </form>

      <ProductList products={products} />

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: pages }).map((_, idx) => {
          const p = idx + 1;
          const isCurrent = p === page;
          return (
            <a
              key={p}
              href={buildUrl(p)}
              className={`px-3 py-1 rounded border ${
                isCurrent
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-slate-900 border-slate-700 text-slate-200"
              }`}
            >
              {p}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (ctx) => {
  await connectDB();
  const { page = "1", team, q } = ctx.query;

  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = 9;

  const filter: Record<string, unknown> = {};
  if (team) filter.team = team;
  if (q) {
    filter.name = { $regex: q, $options: "i" };
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .lean(),
    Product.countDocuments(filter)
  ]);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      team: (team as string | undefined) ?? null,
      q: (q as string | undefined) ?? null
    }
  };
};
