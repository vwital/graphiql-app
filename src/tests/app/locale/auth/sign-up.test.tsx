import SingUpPage from "@/app/[locale]/(auth)/sign-up/page";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("SignUp Page", () => {
  it("render sign up page ", () => {
    render(
      <IntlProviderWrapper>
        <SingUpPage />
      </IntlProviderWrapper>
    );

    const titleElement = screen.getByText("Sign Up");
    expect(titleElement).toBeInTheDocument();
  });
});
