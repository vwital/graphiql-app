import StoreProvider from "@/app/StoreProvider";
import { render } from "@testing-library/react";
import { useSelector } from "react-redux";

const MockComponent = () => {
  const testValue = useSelector(() => "test value");
  return <div>{testValue}</div>;
};

describe("StoreProvider", () => {
  it("should render children inside the Redux Provider", () => {
    const { getByText } = render(
      <StoreProvider>
        <MockComponent />
      </StoreProvider>
    );

    expect(getByText("test value")).toBeInTheDocument();
  });
});
