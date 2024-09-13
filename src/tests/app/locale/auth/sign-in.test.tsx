import SignInPage from "@/app/[locale]/(auth)/sign-in/page";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("SignIn Page", () => {
  it("render sign in page ", () => {
    render(
      <IntlProviderWrapper>
        <SignInPage />
      </IntlProviderWrapper>
    );

    const titleElement = screen.getByText("Sign In");
    expect(titleElement).toBeInTheDocument();
  });
});
