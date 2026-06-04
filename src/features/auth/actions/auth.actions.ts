"use server"

import { cookies } from "next/headers"

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function removeSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("refreshToken")
}
