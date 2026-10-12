"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  signUpSchema,
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";
import type { ActionState, FieldErrors } from "@/lib/types";

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const toFieldErrors = (e: z.ZodError) => z.flattenError(e).fieldErrors as FieldErrors;
const rawEmail = (fd: FormData) => String(fd.get("email") ?? "");

export async function signUp(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error), email: rawEmail(formData) };
  }

  const { email, password, fullName } = parsed.data;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${siteUrl()}/auth/confirm?next=/dashboard`,
    },
  });

if (error) {
  console.error("SIGNUP ERROR:", error.code, error.status, error.message);
  return { error: "No se pudo crear la cuenta. Intenta de nuevo.", email };
}

  // Si la confirmación por correo está desactivada, ya hay sesión.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return {
    success: "Cuenta creada. Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.",
  };
}

export async function signIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error), email: rawEmail(formData) };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      error:
        error.code === "email_not_confirmed"
          ? "Debes confirmar tu correo antes de iniciar sesión."
          : "Correo o contraseña incorrectos.", // mensaje genérico a propósito
      email: parsed.data.email,
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function forgotPassword(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = forgotPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error), email: rawEmail(formData) };
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${siteUrl()}/auth/confirm?next=/reset-password`,
  });

  // Siempre la misma respuesta: no revelamos si el correo existe.
  return { success: "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña." };
}

export async function resetPassword(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = resetPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "El enlace expiró. Solicita uno nuevo." };

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { error: "No se pudo actualizar la contraseña. Intenta de nuevo." };

  revalidatePath("/", "layout");
  redirect("/dashboard");
}