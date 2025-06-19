import React from "react";
import type { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface CheckBoxProps {
  checkboxName: string;
  checkBoxOptions: Option[];
  error?: Merge<FieldError, (FieldError | undefined)[]>;
  registeration: UseFormRegisterReturn;
}

const CheckBoxGroup: React.FC<CheckBoxProps> = ({
  checkboxName,
  checkBoxOptions,
  error,
  registeration,
}) => (
  <>
    {checkBoxOptions.map((opt) => (
      <div>
        <input
          type="checkbox"
          id={opt.id}
          value={opt.value}
          {...registeration}
          aria-invalid={error ? "true" : "false"}
        />
        <label htmlFor={opt.id}>{opt.label}</label> <br />
      </div>
    ))}
    {error && (
      <p
        role="alert"
        tabIndex={-1}
        className="error-message"
        id={`${checkboxName}-error`}
      >
        {error.message}
      </p>
    )}
  </>
);

export default CheckBoxGroup;
