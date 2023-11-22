import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const publicRoute = ["/login", "/register"].includes(
      request.nextUrl.pathname
    );

    const token = request.cookies.get("token")?.value;

    if (token && publicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && !publicRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    NextResponse.next();
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export const config = {
  matcher: ["/login", "/register", "/", "/client_home"],
};
