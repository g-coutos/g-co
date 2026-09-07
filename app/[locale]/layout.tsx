import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/footer';
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

const departureMono = localFont({
	src: '../../public/font/DepartureMono-Regular.woff2',
	variable: '--font-departure',
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
		<html lang={locale} suppressHydrationWarning>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: sets theme before paint to avoid flash
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
					}}
				/>
				<script
					defer
					src="https://cloud.umami.is/script.js"
					data-website-id="5f2c1d66-3464-4653-8413-324cc1d061eb"
				></script>
			</head>
			<body
				className={`${inter.className} ${instrumentSerif.variable} ${departureMono.variable} antialiased flex min-h-screen flex-col`}
			>
				<div className="flex-1">{children}</div>
				<Footer
					locale={locale as Locale}
					codeLabel={t.footer.code}
					rssFeedLabel={t.footer.rssFeed}
				/>
				<Analytics />
			</body>
		</html>
	);
}
