import { render, screen, fireEvent } from "@testing-library/react";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import { Mock } from "vitest";
import RestForm from "@/components/pages/restClient/components/restForm/RestForm";
import { useParams } from "next/navigation";
import Page from "@/app/[locale]/rest/page";
import PageUrl from "@/app/[locale]/rest/[method]/[[...requestUrl]]/page";
import { useSelector } from "react-redux";

const mockRouterPush = vi.fn();

vi.mock("@/navigation", () => ({
  useParams: () => ({ locale: "en" }),
  usePathname: () => "/",
  useRouter: vi.fn(() => ({
    push: mockRouterPush,
  })),
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("react-dom", () => ({
  useFormState: vi.fn(() => [null, vi.fn()]),
  useFormStatus: vi.fn(() => ({ pending: false })),
}));

vi.mock("@/utils/convertBase64", () => ({
  convertToBase64: vi.fn(() => "base64"),
  convertFromBase64: vi.fn(() => "decodedValue"),
}));

describe("RestForm", () => {
  beforeEach(() => {
    (useParams as Mock).mockReturnValue({
      method: "GET",
      requestUrl: ["encodedUrl", "encodedBody"],
    });
  });

  it("render rest page", () => {
    (useParams as Mock).mockReturnValue({});
    (useSelector as unknown as Mock).mockReturnValue([]);

    render(
      <IntlProviderWrapper>
        <Page />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("REST Client")).toBeInTheDocument();
  });

  it("render rest page with url", () => {
    (useParams as Mock).mockReturnValue({});
    (useSelector as unknown as Mock).mockReturnValue([]);

    render(
      <IntlProviderWrapper>
        <PageUrl />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("REST Client")).toBeInTheDocument();
  });

  it("should render the form with default values", () => {
    render(
      <IntlProviderWrapper>
        <RestForm />
      </IntlProviderWrapper>
    );

    expect(screen.getByLabelText(/Method/)).toBeInTheDocument();
    expect(screen.getByLabelText(/URL/)).toBeInTheDocument();
    expect(screen.getByText(/Add body/)).toBeInTheDocument();
    expect(screen.getByText(/Delete body/)).toBeInTheDocument();
    expect(screen.getByText(/Pretty/)).toBeInTheDocument();
    expect(screen.getByText(/Add header/)).toBeInTheDocument();
  });

  it("should add and remove body fields", () => {
    render(
      <IntlProviderWrapper>
        <RestForm />
      </IntlProviderWrapper>
    );

    fireEvent.click(screen.getByText(/Add body/));
    expect(screen.getAllByRole("textbox")).toHaveLength(2);

    fireEvent.click(screen.getByText(/Add header/));
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("should handle method and URL changes", () => {
    render(
      <IntlProviderWrapper>
        <RestForm />
      </IntlProviderWrapper>
    );

    fireEvent.change(screen.getByLabelText(/Method/), {
      target: { value: "POST" },
    });
    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining("/"));

    fireEvent.blur(screen.getByLabelText(/URL/), {
      target: { value: "https://new-url.com" },
    });
    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("base64")
    );
  });
});
