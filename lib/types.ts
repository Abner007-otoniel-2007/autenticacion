export type FieldErrors = Record<string, string[] | undefined>;

export type ActionState = {
  error?: string;
  success?: string;
  fieldErrors?: FieldErrors;
  email?: string;
};