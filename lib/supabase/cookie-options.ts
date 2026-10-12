import type { CookieOptions } from "@supabase/ssr";

export function secureCookieOptions(options: CookieOptions = {}): CookieOptions {
  return {
    ...options,
    httpOnly: true, // JS del navegador no puede leer la cookie (mitiga XSS)
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // mitiga CSRF
    path: "/",
  };
}