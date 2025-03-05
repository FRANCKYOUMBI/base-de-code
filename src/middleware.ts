import { pagesOptions } from "@/app/[lang]/api/auth/[...nextauth]/pages-options";
import withAuth from "next-auth/middleware";
import {NextFetchEvent, NextResponse} from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/settings";
import { useModal } from "./components/modal-views/use-modal";
import { routes } from "./config/routes";

acceptLanguage.languages(languages);

const cookieName = "i18next";

const publicRoutes = [
  // avatars folders
  /[a-zA-Z]{0,2}\/auth\/[a-zA-Z]+/g,
  /[a-zA-Z]{0,2}\/api\/auth\/[a-zA-Z]+/g,
  /\/_next\/.*/g,
  /^\/(fr|en)$/,
  /^\/(fr|en)\/home_page\/hero_top\/about$/,
  /^\/(fr|en)\/home_page\/hero_top\/services$/,
  /^\/(fr|en)\/home_page\/hero_top\/career$/,
];

// Define protected routes that require specific roles/permissions
const protectedRoutes = {
  sales: {
    pattern: /\/(fr|en)\/\(hydrogen\)\/sales/,
    roles: ['admin', 'sales_manager', 'cashier']
  }
};

export function middleware(req: any, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // Check if it's the homepage (fr or en root path)
  if (pathname === '/fr' || pathname === '/en') {
    return NextResponse.next();
  }
  // Check if the current route is a protected route
  const protectedRoute = Object.values(protectedRoutes).find(route => 
    route.pattern.test(pathname)
  );

  if (protectedRoute) {
    // Here you would check the user's role from the session
    // For now, we'll just use the basic auth protection
    return withAuth({
      pages: {
        ...pagesOptions,
      },
    })(req, event);
  }

  if (pathname.indexOf('avatars') > -1) {
    return NextResponse.next();
  }

  let isUnProtectedRoute = false;
  for (const route of publicRoutes) {
    if (new RegExp(route).test(pathname)) {
      isUnProtectedRoute = true;
      break;
    }
  }

  if (
    req.nextUrl.pathname.indexOf("chrome") > -1
  )
    return NextResponse.next();
  let lang;

  if (req.cookies.has(cookieName)) lang = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lang) lang = fallbackLng;

  if (
    !languages.some((local) => req.nextUrl.pathname.startsWith(`/${local}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${lang}${req.nextUrl.pathname}`, req.url));
  }
  if (!isUnProtectedRoute) {
    // Vérifier si on n'a pas déjà le paramètre showAuthModal
    if (!req.nextUrl.searchParams.has('showAuthModal')) {
      const url = req.nextUrl.clone();
      url.searchParams.set('showAuthModal', 'true');
      return NextResponse.redirect(url);
    }
    // Si on a déjà le paramètre, continuer normalement
    return NextResponse.next();
  }
}
