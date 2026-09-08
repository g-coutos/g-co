import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface FooterProps {
	locale: Locale;
	codeLabel: string;
	rssFeedLabel: string;
}

export function Footer({ locale, codeLabel, rssFeedLabel }: FooterProps) {
	const GITHUB_REPO_URL = process.env.GITHUB_REPO_URL || '';
	const LINKEDIN_URL = process.env.LINKEDIN_URL || '';
	const X_URL = process.env.X_URL || '';

	return (
		<footer className="mt-auto w-full max-w-xl mx-auto px-8">
			<div className="h-16 flex items-center justify-center md:justify-start gap-2 py-8 text-xs border-t border-gray-300">
				<span>© {new Date().getFullYear()} g-co</span>
				<span className="text-gray-500">|</span>
				<FooterLink href={GITHUB_REPO_URL}>{codeLabel}</FooterLink>
				<span className="text-gray-500">|</span>
				<FooterLink href={`/${locale}/rss.xml`}>{rssFeedLabel}</FooterLink>
				<span className="text-gray-500">|</span>
				<FooterLink href={X_URL}>X</FooterLink>
				<span className="text-gray-500">|</span>
				<FooterLink href={LINKEDIN_URL}>LinkedIn</FooterLink>
			</div>
		</footer>
	);
}

const FooterLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="block text-gray-500 hover:text-gray-700 transition-colors duration-200"
		>
			{children}
		</Link>
	);
};
