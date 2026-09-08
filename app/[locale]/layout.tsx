import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getDictionary, type Locale, locales } from '@/lib/i18n';
import '../globals.css';

const inter = Inter({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	preload: true,
});

const instrumentSerif = Instrument_Serif({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-instrument-serif',
	preload: true,
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getDictionary(locale as Locale);

	return {
		title: 'Gui Couto',
		description: t.metadata.siteDescription,
		alternates: {
			types: {
				'application/rss+xml': `/${locale}/rss.xml`,
			},
		},
	};
}

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const t = await getDictionary(locale as Locale);

	return (
		<html lang={locale}>
			<head>
				<script
					defer
					src="https://cloud.umami.is/script.js"
					data-website-id="5f2c1d66-3464-4653-8413-324cc1d061eb"
				></script>
			</head>
			<body
				className={`${inter.className} ${instrumentSerif.variable} antialiased flex min-h-screen flex-col`}
			>
				<div className="flex flex-1 flex-col">{children}</div>
				<Analytics />
			</body>
		</html>
	);
}
