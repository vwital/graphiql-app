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
        return { value: "mocked_session_value" };
      }
      if (name === "user_name") {
        return { value: "mocked_username" };
      }
      return null;
    },
  }),
}));

describe("WelcomePage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders WelcomeMessage with correct props", () => {
    render(
      <IntlProviderWrapper>
        <WelcomePage />
      </IntlProviderWrapper>
    );

    expect(
      screen.getByText("Welcome Back, mocked_username")
    ).toBeInTheDocument();
  });

  it("renders ActionButtons with correct links based on auth status when user is authenticated", () => {
    render(
      <IntlProviderWrapper>
        <WelcomePage />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("REST Client")).toBeInTheDocument();
    expect(screen.getByText("GraphQL Client")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
  });

  it("renders AuthorsSection", () => {
    render(
      <IntlProviderWrapper>
        <WelcomePage />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("Authors")).toBeInTheDocument();
    expect(screen.getByText("About course")).toBeInTheDocument();
    expect(
      screen.getByText("https://rs.school/courses/reactjs")
    ).toBeInTheDocument();
  });
});
