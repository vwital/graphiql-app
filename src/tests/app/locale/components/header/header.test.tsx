import LocaleSwitcherButton from "@/components/elements/LocaleSwitcherButton";
import Header from "@/components/header/Header";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

const mockedReplace = vi.fn();

vi.mock("@/navigation", () => ({
  useParams: () => ({ locale: "en" }),
  usePathname: () => "/",
  useRouter: () => ({ replace: mockedReplace }),
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    logOut: vi.fn(),
  }),
}));

describe("Header component", () => {
  it("renders header with navigation links when session is present", () => {
    render(
      <IntlProviderWrapper>
        <Header session="test-session" />
      </IntlProviderWrapper>
    );

    const titleElement = screen.getByText("REST/GraphQL Client");
    expect(titleElement).toBeInTheDocument();

    const mainPageLink = screen.getByText("Main Page");
    const logoutButton = screen.getByText("Sign Out");
    expect(mainPageLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it("renders login and register links when session is null", () => {
    render(
      <IntlProviderWrapper>
        <Header session={null} />
      </IntlProviderWrapper>
    );

    const loginLink = screen.getByText("Sign In");
    const registerLink = screen.getByText("Sign Up");
    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it("renders LocaleSwitcherButton", () => {
    render(
      <IntlProviderWrapper>
        <Header session={null} />
      </IntlProviderWrapper>
    );

    const localeButton = screen.getByRole("button");
    expect(localeButton).toBeInTheDocument();
  });
});

describe("LocaleSwitcherButton component", () => {
  it("renders and switches locale when clicked", () => {
    render(<LocaleSwitcherButton />);

    const localeButton = screen.getByRole("button");
    expect(localeButton).toBeInTheDocument();

    fireEvent.click(localeButton);
    expect(mockedReplace).toHaveBeenCalled();
  });
});
