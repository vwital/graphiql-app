"use server";

import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_DISPLAY_NAME,
  HOME_PAGE,
  SESSION_COOKIE_EXPIRATION,
} from "@/constants/constants";

export async function createSession(
  expirationTimestamp: string,
  username: string | null
): Promise<void> {
  cookies().set(SESSION_COOKIE_NAME, expirationTimestamp, {
    httpOnly: true,
    maxAge: SESSION_COOKIE_EXPIRATION,
    sameSite: "none",
    secure: true,
    path: HOME_PAGE,
  });
  if (username) {
    cookies().set(SESSION_COOKIE_DISPLAY_NAME, username, {
      httpOnly: true,
      maxAge: SESSION_COOKIE_EXPIRATION,
      sameSite: "none",
      secure: true,
      path: HOME_PAGE,
    });
  }

  redirect("/");
}

export async function removeSession(): Promise<void> {
  cookies().delete(SESSION_COOKIE_NAME);
  cookies().delete(SESSION_COOKIE_DISPLAY_NAME);
  redirect("/");
}
