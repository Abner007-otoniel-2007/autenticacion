"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";
import { signUpSchema } from "@/lib/validations/auth";
import { useClientValidation } from "@/lib/use-client-validation";
import { FormField } from "@/components/FormField";
import { SubmitButton } from "@/components/SubmitButton";
import type { ActionState } from "@/lib/types";

export function RegisterForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(signUp, {});
  const client = useClientValidation(signUpSchema);
  const err = (name: string) => client.errors[name] ?? state.fieldErrors?.[name];

  return (
    <form action={formAction} onSubmit={client.onSubmit} noValidate className="space-y-4">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>

      {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      {state.success && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{state.success}</p>}

      <FormField label="Nombre completo" name="fullName" autoComplete="name" errors={err("fullName")} />
      <FormField label="Correo" name="email" type="email" autoComplete="email" defaultValue={state.email} errors={err("email")} />
      <FormField label="Contraseña" name="password" type="password" autoComplete="new-password" errors={err("password")} />
      <FormField label="Confirmar contraseña" name="confirmPassword" type="password" autoComplete="new-password" errors={err("confirmPassword")} />

      <SubmitButton pendingText="Creando cuenta...">Registrarme</SubmitButton>

      <p className="text-center text-sm">
        ¿Ya tienes cuenta? <Link href="/login" className="text-blue-600 hover:underline">Inicia sesión</Link>
      </p>
    </form>
  );
}