import { cn } from '@/lib/utils';

export function Main({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<main
			className={cn(
				'w-full max-w-xl mx-auto p-8 pt-20 text-sm',
				className,
			)}
		>
			{children}
		</main>
	);
}
