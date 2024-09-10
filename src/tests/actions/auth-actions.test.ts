import { describe, it, expect, vi } from "vitest";
import { createSession, removeSession } from "@/actions/auth-actions";
import { redirect } from "@/navigation";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_EXPIRATION,
  HOME_PAGE,
  SESSION_COOKIE_DISPLAY_NAME,
} from "@/constants/constants";

vi.mock("@/navigation", () => ({
  redirect: vi.fn(),
}));

const mockCookies = {
  set: vi.fn(),
  delete: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: (): unknown => mockCookies,
}));

describe("Session Management", () => {
  beforeEach(() => {
    mockCookies.set.mockReset();
    mockCookies.delete.mockReset();
  });

  it("should create a session and set cookies", async () => {
    const expirationTimestamp = "1234567890";
    const username = "testuser";

    await createSession(expirationTimestamp, username);

    expect(mockCookies.set).toHaveBeenCalledTimes(2);
    expect(mockCookies.set).toHaveBeenCalledWith(
      SESSION_COOKIE_NAME,
      expirationTimestamp,
      {
        httpOnly: true,
        maxAge: SESSION_COOKIE_EXPIRATION,
        sameSite: "none",
        secure: true,
        path: HOME_PAGE,
      }
    );
    expect(mockCookies.set).toHaveBeenCalledWith(
      SESSION_COOKIE_DISPLAY_NAME,
      username,
      {
        httpOnly: true,
        maxAge: SESSION_COOKIE_EXPIRATION,
        sameSite: "none",
        secure: true,
        path: HOME_PAGE,
      }
    );

    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("should create a session without setting username if username is null", async () => {
    const expirationTimestamp = "1234567890";

    await createSession(expirationTimestamp, null);

    expect(mockCookies.set).toHaveBeenCalledTimes(1);
    expect(mockCookies.set).toHaveBeenCalledWith(
      SESSION_COOKIE_NAME,
      expirationTimestamp,
      {
        httpOnly: true,
        maxAge: SESSION_COOKIE_EXPIRATION,
        sameSite: "none",
        secure: true,
        path: HOME_PAGE,
      }
    );

    expect(mockCookies.set).not.toHaveBeenCalledWith(
      SESSION_COOKIE_DISPLAY_NAME,
      expect.anything()
    );

    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("should remove session and delete cookies", async () => {
    await removeSession();

    expect(mockCookies.delete).toHaveBeenCalledTimes(2);
    expect(mockCookies.delete).toHaveBeenCalledWith(SESSION_COOKIE_NAME);
    expect(mockCookies.delete).toHaveBeenCalledWith(
      SESSION_COOKIE_DISPLAY_NAME
    );

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
