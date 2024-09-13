import { render } from "@testing-library/react";
import { vi } from "vitest";
import { notFound } from "next/navigation";
import CatchAllPage from "@/app/[locale]/[...rest]/page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("CatchAllPage", () => {
  it("should call notFound when rendered", () => {
    render(<CatchAllPage />);

    expect(notFound).toHaveBeenCalled();
  });
});
