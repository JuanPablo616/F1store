import { getProviders, signIn } from "next-auth/react";

export default function LoginPage({ providers }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-sm shadow-lg border border-slate-700">
        <h1 className="text-2xl text-white font-bold text-center mb-6">
          Iniciar sesión
        </h1>

        {Object.values(providers).map((provider: any) => (
          <button
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            Entrar con {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
