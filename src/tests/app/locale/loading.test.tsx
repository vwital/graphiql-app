import { render } from "@testing-library/react";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import LoadingPage from "@/app/[locale]/loading";

describe("LoadingPageLocale component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <IntlProviderWrapper>
        <LoadingPage />
      </IntlProviderWrapper>
    );
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
