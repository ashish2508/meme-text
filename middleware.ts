import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

interface RouteConfig {
  protectedPaths: string[];
  authPages: string[];
  publicPaths: string[];
}

const routes: RouteConfig = {
  protectedPaths: [
    "/dashboard",
    "/profile",
    "/settings",
    "/customize",
    "/favorites",
    "/upload"
  ],
  authPages: [
    "/login",
    "/signup",
    "/auth"
  ],
  publicPaths: [
    "/",
    "/search",
    "/about",
    "/contact"
  ]
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();
    const { pathname } = request.nextUrl;

    const matchesPath = (paths: string[], currentPath: string): boolean => {
      return paths.some((path: string) => currentPath.startsWith(path));
    };

    const isProtectedPath = matchesPath(routes.protectedPaths, pathname);
    const isAuthPage = matchesPath(routes.authPages, pathname);

    if (isProtectedPath && !session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isAuthPage && session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();

  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
