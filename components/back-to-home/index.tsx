import Link from 'next/link';

interface BackToHomeProps {
	label: string;
	href: string;
}

export function BackToHome({ label, href }: BackToHomeProps) {
	return (
		<Link
			href={href}
			className="flex items-center gap-2 mb-8 text-xs text-gray-500 hover:text-gray-700 transition-[300ms]"
		>
			<span style={{ fontFamily: 'monospace' }}>←</span> {label}
		</Link>
	);
}
