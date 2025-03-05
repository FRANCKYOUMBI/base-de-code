import { pagesOptions } from "@/app/[lang]/api/auth/[...nextauth]/pages-options";
import withAuth from "next-auth/middleware";
import {NextFetchEvent, NextResponse} from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/settings";


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

  // Early return for static files and special paths
  if (pathname.includes('avatars') || 
      pathname.includes('chrome') || 
      pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Handle direct language switch
  if (pathname === '/fr' || pathname === '/en') {
    const lang = pathname.substring(1);
    const response = NextResponse.next();
    response.cookies.set(cookieName, lang, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    });
    return response;
  }

  // Check if current path is in public routes
  let isUnProtectedRoute = publicRoutes.some(route => new RegExp(route).test(pathname));

  // Language detection
  let lang;
  const pathLang = pathname.split('/')[1];

  if (languages.includes(pathLang)) {
    lang = pathLang;
    // Update cookie if language in path is different from cookie
    if (!req.cookies.has(cookieName) || req.cookies.get(cookieName).value !== lang) {
      const response = NextResponse.next();
      response.cookies.set(cookieName, lang, {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30
      });
      return response;
    }
  } else {
    // Get language from cookie or default
    lang = req.cookies.has(cookieName) 
      ? req.cookies.get(cookieName).value 
      : fallbackLng;
    
    // Redirect only if path doesn't start with language code
    if (!pathname.match(/^\/[a-z]{2}($|\/)/)) {
      return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url));
    }
  }

  // Handle protected routes
  const protectedRoute = Object.values(protectedRoutes).find(route => 
    route.pattern.test(pathname)
  );

  if (protectedRoute) {
    return withAuth({
      pages: {
        ...pagesOptions,
      },
    })(req, event);
  }

  // Handle auth modal for non-public routes
  if (!isUnProtectedRoute && !req.nextUrl.searchParams.has('showAuthModal')) {
    const url = req.nextUrl.clone();
    url.searchParams.set('showAuthModal', 'true');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
