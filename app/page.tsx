import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-3xl font-bold">Bienvenido</h1>
      <p className="text-gray-600">Autenticación con Next.js 16 y Supabase.</p>
      <Link href="/dashboard" className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Ir al dashboard
      </Link>
    </section>
  );
}