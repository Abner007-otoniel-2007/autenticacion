"use client";

import { useState } from "react";
import { z } from "zod";
import type { FieldErrors } from "@/lib/types";

export function useClientValidation(schema: z.ZodType) {
  const [errors, setErrors] = useState<FieldErrors>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const result = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!result.success) {
      e.preventDefault(); // no se ejecuta la Server Action
      setErrors(z.flattenError(result.error).fieldErrors as FieldErrors);
    } else {
      setErrors({});
    }
  }

  return { errors, onSubmit };
}