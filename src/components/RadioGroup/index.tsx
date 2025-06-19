import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface RadioInputProps {
  radioName: string;
  radioOptions: Option[];
  error?: FieldError;
  registeration: UseFormRegisterReturn;
}

const RadioGroup: React.FC<RadioInputProps> = ({
  radioName,
  radioOptions,
  error,
  registeration,
}) => {
  return (
    <div>
      {radioOptions.map((opt) => (
        <React.Fragment key={opt.id}>
          <input
            type="radio"
            id={opt.id}
            value={opt.value}
            {...registeration}
            aria-invalid={error ? "true" : "false"}
          />
          <label htmlFor={opt.id}>{opt.label}</label>
        </React.Fragment>
      ))}
      {error && (
        <p
          role="alert"
          tabIndex={-1}
          className="error-message"
          id={`${radioName}-error`}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;
