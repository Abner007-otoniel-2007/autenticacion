"use client";

import Link from "next/link";
import { useActionState } from "react";
import { forgotPassword } from "@/app/actions/auth";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { useClientValidation } from "@/lib/use-client-validation";
import { FormField } from "@/components/FormField";
import { SubmitButton } from "@/components/SubmitButton";
import type { ActionState } from "@/lib/types";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(forgotPassword, {});
  const client = useClientValidation(forgotPasswordSchema);
  const err = (name: string) => client.errors[name] ?? state.fieldErrors?.[name];

  return (
    <form action={formAction} onSubmit={client.onSubmit} noValidate className="space-y-4">
      <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
      <p className="text-sm text-gray-600">Te enviaremos un enlace para restablecerla.</p>

      {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      {state.success && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{state.success}</p>}

      <FormField label="Correo" name="email" type="email" autoComplete="email" defaultValue={state.email} errors={err("email")} />

      <SubmitButton pendingText="Enviando...">Enviar enlace</SubmitButton>

      <p className="text-center text-sm">
        <Link href="/login" className="text-blue-600 hover:underline">Volver a iniciar sesión</Link>
      </p>
    </form>
  );
}