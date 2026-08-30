import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as typeof defaultLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(",")[0].split(";")[0].slice(0, 2);
    if (preferred === "ar") return "ar";
    if (preferred === "fr") return "fr";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Skip static files and API routes
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/img/") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".txt") ||
    pathname.endsWith(".json") ||
    pathname.endsWith(".xml") ||
    pathname.endsWith(".kml") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/sitemap-index.xml" ||
    pathname === "/geo.kml" ||
    pathname === "/feed.xml" ||
    pathname === "/atom.xml" ||
    pathname === "/llms.txt" ||
    pathname === "/llms-full.txt" ||
    pathname === "/manifest.json" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Handle www redirect
  const host = request.headers.get("host") || "";
  if (host === "www.mujaaco.com") {
    const redirectUrl = new URL(request.url);
    redirectUrl.host = "mujaaco.com";
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Handle subdomains
  const hostname = host.split(":")[0];
  const parts = hostname.split(".");
  let subdomain: string | null = null;

  if (hostname.includes("localhost") || hostname === "localhost") {
    if (parts.length > 1 && parts[0] !== "localhost") {
      subdomain = parts[0];
    }
  } else if (hostname.endsWith("mujaaco.com")) {
    if (parts.length >= 3 && parts[0] !== "www") {
      subdomain = parts[0];
    }
  }

  const SUBDOMAINS = ["blog", "projects", "music", "funmacs", "mujaos"];
  if (subdomain && SUBDOMAINS.includes(subdomain)) {
    const prefix = `/${subdomain}`;
    if (!pathname.startsWith(prefix)) {
      url.pathname = pathname === "/" ? prefix : `${prefix}${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // i18n locale detection
  const pathnameHasLocale = locales.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`,
  );

  if (pathnameHasLocale) {
    const locale = pathname.split("/")[1];
    request.headers.set("x-locale", locale);
    const response = NextResponse.next({ request });
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 31536000,
    });
    return response;
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  const newUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
    request.url,
  );
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.ico|.*\\.png|.*\\.svg|.*\\.txt|.*\\.xml|.*\\.kml).*)",
  ],
};
