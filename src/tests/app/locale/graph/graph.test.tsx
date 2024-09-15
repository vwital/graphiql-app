import Page from "@/app/[locale]/graph/page";
import PageEndpoint from "@/app/[locale]/graph/[endpoint]/page";
import PageUrl from "@/app/[locale]/graph/[endpoint]/[url]/page";
import GraphiForm from "@/components/pages/graphiClient/components/graphiForm/GraphiForm";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

const mockRouterPush = vi.fn();

vi.mock("@/navigation", () => ({
  usePathname: () => "/",
  useRouter: vi.fn(() => ({
    push: mockRouterPush,
  })),
}));

vi.mock("next/navigation", () => ({
  useParams: () => ({ endpoint: "endpoint" }),
  useSearchParams: vi.fn(),
}));

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("@/utils/convertBase64", () => ({
  convertToBase64: vi.fn(() => "base64"),
  convertFromBase64: vi.fn(() => "decodedValue"),
}));

vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: {} }),
      status: 200,
      statusText: "OK",
    })
  )
);

describe("GraphQL Page", () => {
  it("render graphql page", () => {
    render(
      <IntlProviderWrapper>
        <Page />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("GraphQL Client")).toBeInTheDocument();
    expect(screen.getByText("Endpoint URL")).toBeInTheDocument();
    expect(screen.getByText("SDL URL")).toBeInTheDocument();
    expect(screen.getByText("Query")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add header" })
    ).toBeInTheDocument();
  });

  it("render graphql page with endpoint", () => {
    render(
      <IntlProviderWrapper>
        <PageEndpoint />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("GraphQL Client")).toBeInTheDocument();
    expect(screen.getByText("Endpoint URL")).toBeInTheDocument();
    expect(screen.getByText("SDL URL")).toBeInTheDocument();
    expect(screen.getByText("Query")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add header" })
    ).toBeInTheDocument();
  });

  it("render graphql page with url", () => {
    render(
      <IntlProviderWrapper>
        <PageUrl />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("GraphQL Client")).toBeInTheDocument();
    expect(screen.getByText("Endpoint URL")).toBeInTheDocument();
    expect(screen.getByText("SDL URL")).toBeInTheDocument();
    expect(screen.getByText("Query")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add header" })
    ).toBeInTheDocument();
  });

  it("should handle form submission", async () => {
    render(
      <IntlProviderWrapper>
        <GraphiForm />
      </IntlProviderWrapper>
    );

    fireEvent.change(screen.getByLabelText(/endpoint/i), {
      target: { value: "https://example.com/graphql" },
    });
    fireEvent.change(screen.getByLabelText(/query/i), {
      target: { value: "{ query { test } }" },
    });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("https://example.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "{ query { test } }",
          variables: {},
        }),
      });
    });
  });
});
