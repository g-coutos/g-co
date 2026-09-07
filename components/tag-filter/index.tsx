import Link from 'next/link';
import { TagBadge } from '@/components/tag-badge';
import { getAllTags } from '@/lib/articles';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface TagFilterProps {
	activeTag?: string;
	locale: Locale;
	allLabel: string;
}

export async function TagFilter({
	activeTag,
	locale,
	allLabel,
}: TagFilterProps) {
	const tags = await getAllTags(locale);

	return (
		<div className="flex flex-wrap gap-2 items-center p-8">
			<Link
				href={`/${locale}/articles`}
				className={cn(
					'px-2 py-0.5 border rounded text-xs transition-colors duration-200',
					!activeTag
						? 'border-sky-500 text-foreground'
						: 'bg-gray-100 border-gray-100 text-gray-500 hover:bg-gray-200',
				)}
			>
				{allLabel}
			</Link>
			{tags.map((tag) => (
				<TagBadge
					key={tag}
					tag={tag}
					active={tag === activeTag}
					locale={locale}
				/>
			))}
		</div>
	);
}
