import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MiApp | Auth con Supabase",
  description: "Autenticación segura con Next.js y Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="mx-auto max-w-3xl p-6">{children}</main>
      </body>
    </html>
  );
}