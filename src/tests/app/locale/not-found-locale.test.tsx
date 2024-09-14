import NotFound from "@/app/[locale]/not-found";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import { render } from "@testing-library/react";

describe("NotFoundLocale", () => {
  it("renders NotFoundGeneral component", () => {
    const { getByText } = render(
      <IntlProviderWrapper>
        <NotFound />
      </IntlProviderWrapper>
    );
    expect(getByText("Page not found")).toBeInTheDocument();
  });
});
