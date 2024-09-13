import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import WelcomePage from "@/components/pages/welcomePage/WelcomePage";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";

vi.mock("next/image", () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement>
  ): React.ReactNode => <img {...props} />,
}));

vi.mock("next/headers", () => ({
  cookies: (): { get: (name: string) => { value: string | null } | null } => ({
    get: (name: string): { value: string | null } | null => {
      if (name === "user_session") {
        return { value: null };
      }
      if (name === "user_name") {
        return { value: null };
      }
      return null;
    },
  }),
}));

describe("WelcomePageNotAuth", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders WelcomeMessage with correct props", () => {
    render(
      <IntlProviderWrapper>
        <WelcomePage />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("Welcome!")).toBeInTheDocument();
  });

  it("renders ActionButtons with correct links based on auth status when user is not authenticated", () => {
    render(
      <IntlProviderWrapper>
        <WelcomePage />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });
});
