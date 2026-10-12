import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-3xl items-center justify-between p-4">
        <Link href="/" className="font-bold">
          MiApp
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <form action={signOut}>
                <button type="submit" className="rounded-lg border px-3 py-1 hover:bg-gray-100">
                  Cerrar sesión
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Iniciar sesión
              </Link>
              <Link href="/register" className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}