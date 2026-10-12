import { z } from "zod";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Ingresa un correo válido"));

const password = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .max(72, "Máximo 72 caracteres")
  .regex(/[A-Z]/, "Incluye al menos una mayúscula")
  .regex(/[0-9]/, "Incluye al menos un número");

export const signUpSchema = z
  .object({
    fullName: z.string().trim().min(2, "Ingresa tu nombre").max(80),
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Ingresa tu contraseña"),
});

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z
  .object({ password, confirmPassword: z.string() })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });