import React from "react";
import { render, screen } from "@testing-library/react";
import CheckBoxGroup from "./index";

describe("CheckBoxGroup", () => {
  const mockOptions = [
    { id: "opt1", label: "Option 1", value: "option1" },
    { id: "opt2", label: "Option 2", value: "option2" },
  ];

  const mockRegistration = {
    name: "interests",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    ref: jest.fn(),
  };

  it("renders all checkbox options with labels", () => {
    render(
      <CheckBoxGroup
        checkboxName="interests"
        checkBoxOptions={mockOptions}
        registeration={mockRegistration}
      />
    );

    // Checkboxes
    mockOptions.forEach(({ id, label }) => {
      const checkbox = screen.getByRole("checkbox", { name: label });
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("id", id);
    });
  });

  it("renders error message if error is passed", () => {
    const error = {
      message: "At least one option must be selected",
      type: "required",
    };

    render(
      <CheckBoxGroup
        checkboxName="interests"
        checkBoxOptions={mockOptions}
        registeration={mockRegistration}
        error={error}
      />
    );

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(error.message);
    expect(errorMessage).toHaveAttribute("id", "interests-error");
  });
});
