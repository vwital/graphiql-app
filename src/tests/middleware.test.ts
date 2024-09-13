import { describe, it, expect, vi, Mock } from "vitest";
import middleware, { config } from "../middleware";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "../constants/constants";
import createMiddleware from "next-intl/middleware";

vi.mock("next-intl/middleware", () => ({
  default: vi.fn(() => vi.fn()),
}));

describe("Middleware tests", () => {
  const mockRequest = (
    url: string,
    cookies: Record<string, string> = {}
  ): Partial<NextRequest> => {
    return {
      url,
      cookies: {
        get: (name: string) => ({ value: cookies[name] }),
      },
    } as Partial<NextRequest>;
  };

  const mockNextResponse = {
    redirect: vi.fn((url: string | URL) => `Redirecting to ${url}`),
    next: vi.fn(() => "Next"),
  };

  vi.spyOn(NextResponse, "redirect").mockImplementation(
    mockNextResponse.redirect as unknown as () => NextResponse
  );
  vi.spyOn(NextResponse, "next").mockImplementation(
    mockNextResponse.next as unknown as () => NextResponse
  );

  const i18nMiddlewareMock = vi.fn();
  (createMiddleware as unknown as Mock).mockReturnValue(i18nMiddlewareMock);

  it("should redirect to home if session exists and public route is accessed", () => {
    const request = mockRequest("http://localhost:3000/en/sign-in", {
      [SESSION_COOKIE_NAME]: "session123",
    });
    const response = middleware(request as NextRequest);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/", request.url)
    );
    expect(response).toBe("Redirecting to http://localhost:3000/");
  });

  it("should redirect to home if no session exists and protected route is accessed", () => {
    const request = mockRequest("http://localhost:3000/en/dashboard", {});
    const response = middleware(request as NextRequest);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/", request.url)
    );
    expect(response).toBe("Next");
  });

  it("should match the correct routes in config", () => {
    expect(config.matcher).toEqual(["/", "/(ru|en)/:path*"]);
  });
});
