"use server";

import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_DISPLAY_NAME,
} from "@/constants/constants";

export async function createSession(
  expirationTimestamp: string,
  username: string | null
): Promise<void> {
  cookies().set(SESSION_COOKIE_NAME, expirationTimestamp, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "none",
    secure: true,
    path: "/",
  });
  if (username) {
    cookies().set(SESSION_COOKIE_DISPLAY_NAME, username, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "none",
      secure: true,
      path: "/",
    });
  }

  redirect("/");
}

export async function removeSession(): Promise<void> {
  cookies().delete(SESSION_COOKIE_NAME);
  cookies().delete(SESSION_COOKIE_DISPLAY_NAME);
  redirect("/");
}
