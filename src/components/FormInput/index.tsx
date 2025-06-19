import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  error?: FieldError;
  onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  registration: UseFormRegisterReturn;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  error,
  registration,
  onChangeFn,
}) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${id}-error` : undefined}
      {...registration}
      onChange={onChangeFn}
    />
    {error && (
      <p
        role="alert"
        tabIndex={-1}
        className="error-message"
        id={`${id}-error`}
      >
        {error.message}
      </p>
    )}
  </>
);

export default FormInput;
