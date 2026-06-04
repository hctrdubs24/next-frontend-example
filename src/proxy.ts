import { NextRequest, NextResponse } from "next/server"

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("refreshToken")
  const path = request.nextUrl.pathname
  const isPublic =
    path.startsWith("/auth/login") || path.startsWith("/register")

  if (!token && !isPublic)
    return NextResponse.redirect(new URL("/auth/login", request.url))

  if (token && isPublic)
    return NextResponse.redirect(new URL("/dashboard", request.url))

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
