import Page from "@/app/[locale]/rest/page";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import { render, screen } from "@testing-library/react";

describe("GraphiQlClientPage", () => {
  it("should render the correct header text and button text", () => {
    render(
      <IntlProviderWrapper>
        <Page />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("REST Client")).toBeInTheDocument();
    expect(screen.getByText("Method")).toBeInTheDocument();
    expect(screen.getByText("URL")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add header" })
    ).toBeInTheDocument();
    expect(screen.getByText("Response")).toBeInTheDocument();
  });
});
