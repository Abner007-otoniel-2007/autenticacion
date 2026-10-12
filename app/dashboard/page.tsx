import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Defensa en profundidad: se valida otra vez aunque el proxy ya protege la ruta.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, created_at")
    .eq("id", user.id)
    .single();

  const rows: [string, string][] = [
    ["Nombre", profile?.full_name ?? "—"],
    ["Correo", user.email ?? "—"],
    ["ID de usuario", user.id],
    ["Correo confirmado", user.email_confirmed_at ? "Sí" : "No"],
    ["Último inicio de sesión", user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString("es-SV") : "—"],
    ["Miembro desde", profile?.created_at ? new Date(profile.created_at).toLocaleDateString("es-SV") : "—"],
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Hola, {profile?.full_name ?? "usuario"} 👋</h1>
      <dl className="divide-y rounded-xl border bg-white">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1 p-4 sm:flex-row sm:justify-between">
            <dt className="text-sm text-gray-500">{label}</dt>
            <dd className="break-all text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}