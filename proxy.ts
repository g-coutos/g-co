import { type NextRequest, NextResponse } from 'next/server';
import { defaultLocale, type Locale, locales } from '@/lib/i18n/config';

function getLocaleFromHeader(request: NextRequest): Locale {
	const acceptLanguage = request.headers.get('accept-language') || '';
	const preferred = acceptLanguage
		.split(',')[0]
		.trim()
		.split('-')[0]
		.toLowerCase();
	return locales.includes(preferred as Locale)
		? (preferred as Locale)
		: defaultLocale;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const hasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (hasLocale) return NextResponse.next();

	const locale = getLocaleFromHeader(request);
	return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|.*\\..*).*)',
	],
};
