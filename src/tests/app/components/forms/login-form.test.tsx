import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/components/forms/LoginForm";
import { vi } from "vitest";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
}));

describe("LoginForm component", () => {
  it("renders form with email, password inputs and submit button", () => {
    render(
      <IntlProviderWrapper>
        <LoginForm />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("shows validation error messages when inputs are invalid", async () => {
    render(
      <IntlProviderWrapper>
        <LoginForm />
      </IntlProviderWrapper>
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("submits the form with valid data and calls signInWithEmailAndPassword and createSession", async () => {
    render(
      <IntlProviderWrapper>
        <LoginForm />
      </IntlProviderWrapper>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "pass123+" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "test@example.com",
        "pass123+"
      );
    });
  });

  it("shows an error alert if login fails", async () => {
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(
      new Error("Login failed")
    );

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => null);

    render(
      <IntlProviderWrapper>
        <LoginForm />
      </IntlProviderWrapper>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "pass123+" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Something went wrong Error: Login failed"
      );
    });

    alertMock.mockRestore();
  });
});
