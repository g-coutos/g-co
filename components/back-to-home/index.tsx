import { CornerDownLeft } from 'lucide-react';
import Link from 'next/link';

export function BackToHome() {
	return (
		<Link
			href="/"
			className="flex items-center gap-2 mb-4 text-xs uppercase text-gray-500 hover:text-gray-700 transition-[300ms]"
			style={{ fontFamily: 'monospace' }}
		>
			<CornerDownLeft size={14} /> Back
		</Link>
	);
}
