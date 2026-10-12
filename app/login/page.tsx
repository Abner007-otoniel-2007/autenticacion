import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const notice =
    error === "link_invalid" ? "El enlace no es válido o ya expiró. Solicita uno nuevo." : undefined;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <LoginForm notice={notice} />
    </div>
  );
}