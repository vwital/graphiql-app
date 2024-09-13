import { render } from "@testing-library/react";
import RootPage from "@/app/[locale]/page";

vi.mock("@/components/pages/welcomePage/WelcomePage", () => {
  return {
    default: function MockWelcomePage(): React.ReactNode {
      return <div>Mocked WelcomePage Component</div>;
    },
  };
});

describe("RootPage", () => {
  it("renders WelcomePage component", () => {
    const { getByText } = render(<RootPage />);

    expect(getByText("Mocked WelcomePage Component")).toBeInTheDocument();
  });
});
