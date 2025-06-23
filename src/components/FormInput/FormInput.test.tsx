import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormInput from "./index";

describe("FormInput", () => {
  const baseProps = {
    label: "Full Name",
    id: "fullName",
    placeholder: "Enter your name",
    registration: {
      name: "fullName",
      onBlur: jest.fn(),
      onChange: jest.fn(),
      ref: jest.fn(),
    },
    onChangeFn: jest.fn(),
  };

  it("renders label and input with correct props", () => {
    render(<FormInput {...baseProps} />);

    const input = screen.getByPlaceholderText("Enter your name");
    const label = screen.getByText("Full Name");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "fullName");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("renders error message when error prop is provided", () => {
    const errorMessage = "This field is required";

    render(
      <FormInput
        {...baseProps}
        error={{ type: "required", message: errorMessage } as any}
      />
    );

    const alert = screen.getByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(errorMessage);
    expect(alert).toHaveAttribute("id", "fullName-error");

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "fullName-error");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("calls onChangeFn when input value changes", () => {
    render(<FormInput {...baseProps} />);

    const input = screen.getByPlaceholderText("Enter your name");

    fireEvent.change(input, { target: { value: "Nadeem" } });

    expect(baseProps.onChangeFn).toHaveBeenCalledTimes(1);
  });

  it("prevents cut, copy, and paste", () => {
    render(<FormInput {...baseProps} />);
    const input = screen.getByPlaceholderText("Enter your name");

    const cutEvent = fireEvent.cut(input);
    const copyEvent = fireEvent.copy(input);
    const pasteEvent = fireEvent.paste(input, {
      clipboardData: { getData: () => "test" },
    });

    expect(cutEvent).toBe(false);
    expect(copyEvent).toBe(false);
    expect(pasteEvent).toBe(false);
  });
});
