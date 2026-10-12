"use client";

import { useActionState } from "react";
import { resetPassword } from "@/app/actions/auth";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { useClientValidation } from "@/lib/use-client-validation";
import { FormField } from "@/components/FormField";
import { SubmitButton } from "@/components/SubmitButton";
import type { ActionState } from "@/lib/types";

export function ResetPasswordForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(resetPassword, {});
  const client = useClientValidation(resetPasswordSchema);
  const err = (name: string) => client.errors[name] ?? state.fieldErrors?.[name];

  return (
    <form action={formAction} onSubmit={client.onSubmit} noValidate className="space-y-4">
      <h1 className="text-2xl font-bold">Nueva contraseña</h1>

      {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}

      <FormField label="Nueva contraseña" name="password" type="password" autoComplete="new-password" errors={err("password")} />
      <FormField label="Confirmar contraseña" name="confirmPassword" type="password" autoComplete="new-password" errors={err("confirmPassword")} />

      <SubmitButton pendingText="Guardando...">Actualizar contraseña</SubmitButton>
    </form>
  );
}