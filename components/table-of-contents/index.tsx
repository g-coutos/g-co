'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/markdown-to-html';
import { cn } from '@/lib/utils';
import { BackToHome } from '../back-to-home';

const TITLE_ID = 'title';

export function TableOfContents({
	headings,
	title,
	label,
}: {
	headings: Heading[];
	title: string;
	label: string;
}) {
	const [titleHidden, setTitleHidden] = useState(false);

	useEffect(() => {
		const el = document.getElementById(TITLE_ID);
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => setTitleHidden(entry.isIntersecting),
			{ threshold: 0 },
		);
		observer.observe(el);

		return () => observer.disconnect();
	}, []);

	if (headings.length === 0) return null;

	return (
		<nav aria-label={label} className="max-w-50 fixed top-21 left-12 text-sm">
			<BackToHome href="/" />
			<ul className="">
				<li>
					<a
						// biome-ignore lint/a11y/useValidAnchor: This is a valid anchor link that points to an element with the id "title" on the same page.
						href="#"
						className={cn(
							'block -ml-px py-1 mb-2 font-medium transition-colors',
							titleHidden ? 'text-transparent' : 'text-gray-400 hover:text-gray-700',
						)}
					>
						{title}
					</a>
				</li>

				{headings.map((heading) => (
					<li key={heading.id}>
						<a
							href={`#${heading.id}`}
							className="block -ml-px py-1 text-gray-400 transition-colors hover:text-gray-700"
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
