import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorPage from "@/app/[locale]/error";
import { IntlProviderWrapper } from "../utils/test-utils";

describe("ErrorPage component", () => {
  it("renders ErrorPageLocale component", () => {
    const error = new Error("Test error");
    const { getByText } = render(
      <IntlProviderWrapper>
        <ErrorPage error={error} />
      </IntlProviderWrapper>
    );
    expect(getByText("Something went wrong")).toBeInTheDocument();
    expect(getByText("Error: Test error")).toBeInTheDocument();
  });
});
