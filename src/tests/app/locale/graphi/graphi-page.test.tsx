import GraphiQlClientPage from "@/app/[locale]/graphi/page";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import { render, screen } from "@testing-library/react";

describe("GraphiQlClientPage", () => {
  it("should render the correct header text and button text", () => {
    render(
      <IntlProviderWrapper>
        <GraphiQlClientPage />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("GraphiQL Client")).toBeInTheDocument();
    expect(screen.getByText("Endpoint URL")).toBeInTheDocument();
    expect(screen.getByText("Headers")).toBeInTheDocument();
    expect(screen.getByText("Query")).toBeInTheDocument();
    expect(screen.getByText("Variables")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add header" })
    ).toBeInTheDocument();
  });
});
