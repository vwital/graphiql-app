import { render } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  it("renders NotFoundGeneral component", () => {
    const { getByText, container } = render(<NotFound />);
    expect(getByText("Page not found")).toBeInTheDocument();
    const mainElement = container.querySelector("main");
    expect(mainElement).toHaveClass("main");
  });
});
