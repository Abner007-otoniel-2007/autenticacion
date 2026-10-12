"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";
import { signInSchema } from "@/lib/validations/auth";
import { useClientValidation } from "@/lib/use-client-validation";
import { FormField } from "@/components/FormField";
import { SubmitButton } from "@/components/SubmitButton";
import type { ActionState } from "@/lib/types";

export function LoginForm({ notice }: { notice?: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(signIn, {});
  const client = useClientValidation(signInSchema);
  const err = (name: string) => client.errors[name] ?? state.fieldErrors?.[name];

  return (
    <form action={formAction} onSubmit={client.onSubmit} noValidate className="space-y-4">
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>

      {notice && <p role="alert" className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">{notice}</p>}
      {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}

      <FormField label="Correo" name="email" type="email" autoComplete="email" defaultValue={state.email} errors={err("email")} />
      <FormField label="Contraseña" name="password" type="password" autoComplete="current-password" errors={err("password")} />

      <SubmitButton pendingText="Ingresando...">Entrar</SubmitButton>

      <div className="flex justify-between text-sm">
        <Link href="/forgot-password" className="text-blue-600 hover:underline">¿Olvidaste tu contraseña?</Link>
        <Link href="/register" className="text-blue-600 hover:underline">Crear cuenta</Link>
      </div>
    </form>
  );
}