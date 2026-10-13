import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

/** Label above the control, with an inline error message linked by id `${id}-error`. */
export function FormField({ id, label, required = false, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-body mb-2 block font-bold text-green">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-body mt-2 border-l-4 border-tomato pl-3 font-bold text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
