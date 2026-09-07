import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface FooterProps {
	locale: Locale;
	codeLabel: string;
	rssFeedLabel: string;
}

export function Footer({ locale, codeLabel, rssFeedLabel }: FooterProps) {
	const GITHUB_REPO_URL = process.env.GITHUB_REPO_URL || '';

	return (
		<footer className="max-w-2xl w-full mx-auto">
			<div className="h-16 flex items-center justify-center md:justify-start gap-2 mx-auto p-8 text-xs border-t border-gray-300">
				<span>© {new Date().getFullYear()} g-c</span>
				<span className="text-gray-500">|</span>
				<Link
					href={GITHUB_REPO_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="block text-gray-500 hover:text-gray-700 transition-colors duration-200"
				>
					{codeLabel}
				</Link>
				<Link
					href={`/${locale}/rss.xml`}
					target="_blank"
					rel="noopener noreferrer"
					className="block text-gray-500 hover:text-gray-700 transition-colors duration-200"
				>
					{rssFeedLabel}
				</Link>
			</div>
		</footer>
	);
}
