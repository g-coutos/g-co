import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagBadgeProps {
	tag: string;
	active?: boolean;
	locale: string;
}

export function TagBadge({ tag, active = false, locale }: TagBadgeProps) {
	return (
		<Link
			href={`/${locale}/articles?tag=${tag}`}
			className={cn(
				'px-2 py-0.5 border rounded text-xs transition-colors duration-200',
				active
					? 'border-sky-500 text-foreground'
					: 'bg-gray-100 border-gray-100 text-gray-500 hover:bg-gray-200',
			)}
		>
			{tag}
		</Link>
	);
}
