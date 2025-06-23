import React from "react";
import { render, screen } from "@testing-library/react";
import RadioGroup from "./index";

describe("RadioGroup", () => {
  const mockOptions = [
    { id: "opt1", label: "Option 1", value: "option1" },
    { id: "opt2", label: "Option 2", value: "option2" },
  ];

  const mockRegistration = {
    name: "exampleRadio",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    ref: jest.fn(),
  };

  it("renders all radio buttons with labels", () => {
    render(
      <RadioGroup
        radioName="exampleRadio"
        radioOptions={mockOptions}
        registeration={mockRegistration}
      />
    );

    mockOptions.forEach(({ id, label, value }) => {
      const radio = screen.getByRole("radio", { name: label });
      expect(radio).toBeInTheDocument();
      expect(radio).toHaveAttribute("id", id);
      expect(radio).toHaveAttribute("value", value);
      expect(radio).toHaveAttribute("type", "radio");
      expect(radio).toHaveAttribute("aria-invalid", "false");
    });
  });

  it("renders error message if error is provided", () => {
    const error = {
      type: "required",
      message: "Please select an option",
    } as const;

    render(
      <RadioGroup
        radioName="exampleRadio"
        radioOptions={mockOptions}
        registeration={mockRegistration}
        error={error}
      />
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(error.message);

    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute("aria-invalid", "true");
    });
  });
});
