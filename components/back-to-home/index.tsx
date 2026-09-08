import Link from 'next/link';

interface BackToHomeProps {
	href: string;
}

export function BackToHome({ href }: BackToHomeProps) {
	return (
		<Link
			href={href}
			className="flex items-center gap-2 mb-4 text-xs uppercase text-gray-500 hover:text-gray-700 transition-[300ms]"
			style={{ fontFamily: 'monospace' }}
		>
			<span className="block text-2xl">←</span> Back
		</Link>
	);
}
