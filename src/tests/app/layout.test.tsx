import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const testText = "This is a test child";

    const { getByText } = render(
      <RootLayout>
        <div>{testText}</div>
      </RootLayout>
    );

    expect(getByText(testText)).toBeInTheDocument();
  });
});
