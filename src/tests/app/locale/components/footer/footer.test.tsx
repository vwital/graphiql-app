import Footer from "@/components/layouts/footer/Footer";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Footer Component", () => {
  it("should render Footer component", () => {
    render(<Footer />);

    expect(screen.getByText(/©2024/i)).toBeInTheDocument();
  });

  it("should render GithubLogo", () => {
    render(<Footer />);

    const githubLogo = screen.getByTestId("github-logo");
    expect(githubLogo).toBeInTheDocument();
  });

  it("should render RSSchoolLogo", () => {
    render(<Footer />);

    const rsSchoolLogo = screen.getByTestId("rsschool-logo");
    expect(rsSchoolLogo).toBeInTheDocument();
  });
});
