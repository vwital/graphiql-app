import { render, screen } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { useParams } from "next/navigation";
import RestResponse from "@/components/pages/restClient/components/restResponse/RestResponse";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import { useSelector } from "react-redux";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useParams: vi.fn(),
}));

vi.mock("@/components/JsonViewer/JsonViewer", () => ({
  default: vi.fn(() => <div data-testid="json-viewer">JSON Viewer</div>),
}));

describe("RestResponse", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null if requestUrl is not present", () => {
    (useParams as Mock).mockReturnValue({});
    (useSelector as unknown as Mock).mockReturnValue([]);

    const { container } = render(
      <IntlProviderWrapper>
        <RestResponse />
      </IntlProviderWrapper>
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render the response when data is present", () => {
    (useParams as Mock).mockReturnValue({
      requestUrl: ["https://example.com"],
    });
    (useSelector as unknown as Mock).mockReturnValue([
      {
        statusCode: 200,
        dataFromResponse: { message: "Success" },
      },
    ]);

    render(
      <IntlProviderWrapper>
        <RestResponse />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("Response")).toBeInTheDocument();
    expect(screen.getByText("Status code: 200")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();

    expect(screen.getByTestId("json-viewer")).toBeInTheDocument();
  });

  it("should display default status code 0 if no statusCode is provided", () => {
    (useParams as Mock).mockReturnValue({
      requestUrl: ["https://example.com"],
    });
    (useSelector as unknown as Mock).mockReturnValue([
      {
        statusCode: null,
        dataFromResponse: { message: "No Status" },
      },
    ]);

    render(
      <IntlProviderWrapper>
        <RestResponse />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("Response")).toBeInTheDocument();
    expect(screen.getByText("Status code: 0")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
});
