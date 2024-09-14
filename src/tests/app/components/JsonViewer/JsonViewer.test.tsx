import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import JsonViewer from "@/components/JsonViewer/JsonViewer";

describe("JsonViewer Component", () => {
  it("should render JsonViewer Component", () => {
    const mockResponse = { name: "John", age: 30 };
    const { container } = render(<JsonViewer response={mockResponse} />);
    expect(container).toBeInTheDocument();
  });
});
