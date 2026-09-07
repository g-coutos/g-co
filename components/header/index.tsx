import { BackToHome } from '../back-to-home';
import { ThemeToggle } from '../theme-toggle';

export function Header({
	children,
	isHomePage = false,
	backToHomeLabel = 'Back to home',
	locale = 'en',
}: {
	children: React.ReactNode;
	isHomePage?: boolean;
	backToHomeLabel?: string;
	locale?: string;
}) {
	return (
		<header
			className={`w-full max-w-2xl mx-auto ${isHomePage ? 'px-8 py-4' : 'p-8'}`}
		>
			{isHomePage ? (
				<div className="flex justify-end mb-4">
					<ThemeToggle />
				</div>
			) : (
				<div className="flex items-start justify-between">
					<BackToHome label={backToHomeLabel} href={`/${locale}`} />
					<ThemeToggle />
				</div>
			)}
			{children}
		</header>
	);
}
