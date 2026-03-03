import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string {
  try {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      negotiatorHeaders[key] = value;
    });

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale || i18n.defaultLocale;
  } catch (error) {
    console.error("Error determining locale in proxy:", error);
    return i18n.defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip proxy for sitemap files and other static resources
  if (
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icon')
  ) {
    return NextResponse.next();
  }
  
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  // Locale is present in the path, pass it down so RootLayout can set <html lang>
  const localeFromPath = pathname.split('/')[1] || i18n.defaultLocale;
  const resolvedLocale = i18n.locales.includes(localeFromPath as any) ? localeFromPath : i18n.defaultLocale;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-qwantix-locale', resolvedLocale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static files like favicons and sitemaps
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (image files)
     * - favicon.ico, favicon.png, icon.png, icon.ico (favicons)
     * - robots.txt (robots file)
     * - sitemap (all sitemap files: sitemap.xml, sitemap-*.xml, etc.)
     */
    "/((?!api|_next/static|_next/image|images|favicon\\.ico|favicon\\.png|icon\\.png|icon\\.ico|robots\\.txt|sitemap).*)",
  ],
};

