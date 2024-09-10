import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import RegForm from "@/components/forms/RegForm";

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  createUserWithEmailAndPassword: vi.fn(),
}));

describe("RegForm component", () => {
  it("renders form with username, email, password inputs and submit button", () => {
    render(
      <IntlProviderWrapper>
        <RegForm />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("shows validation error messages when inputs are invalid", async () => {
    render(
      <IntlProviderWrapper>
        <RegForm />
      </IntlProviderWrapper>
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("submits the form with valid data and calls createUserWithEmailAndPassword", async () => {
    render(
      <IntlProviderWrapper>
        <RegForm />
      </IntlProviderWrapper>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "pass123+" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "test@example.com",
        "pass123+"
      );
    });
  });
});
