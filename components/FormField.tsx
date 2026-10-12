type Props = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  errors?: string[];
};

export function FormField({ label, name, type = "text", autoComplete, defaultValue, errors }: Props) {
  const id = `field-${name}`;
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={!!errors?.length}
        aria-describedby={errors?.length ? `${id}-error` : undefined}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
      {errors?.length ? (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}