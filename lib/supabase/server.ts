import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { secureCookieOptions } from "./cookie-options";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, secureCookieOptions(options))
            );
          } catch {
            // Llamado desde un Server Component: se ignora; el proxy refresca la sesión.
          }
        },
      },
    }
  );
}