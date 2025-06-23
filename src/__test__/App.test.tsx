import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

jest.mock("@hookform/devtools", () => ({
  DevTool: () => null,
}));

describe("App form", () => {
  it("renders the form", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /form/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Phone Number")).toBeInTheDocument();
  });

  it("shows error when submitting empty form", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Please confirm your phone number/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Please select a choice/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("validates phone numbers and submits the form", async () => {
    render(<App />);
    const phoneInput = screen.getByLabelText("Phone Number");
    const confirmPhoneInput = screen.getByLabelText("Confirm Phone Number");

    await userEvent.type(phoneInput, "2345678901");
    await userEvent.type(confirmPhoneInput, "2345678901");

    fireEvent.click(screen.getByLabelText("Yes", { selector: "input[name='confirmChoice1']" }));
    fireEvent.click(screen.getByLabelText("I have a car"));
    fireEvent.click(screen.getByLabelText("Yes", { selector: "input[name='confirmChoice2']" }));
    fireEvent.click(screen.getByLabelText("Italy"));

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/form is filled successfully/i)).toBeInTheDocument();
    });
  });
});