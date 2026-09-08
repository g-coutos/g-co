'use client';

import { useParams } from 'next/navigation';
import { BackToHome } from '@/components/back-to-home';
import { Main } from '@/components/main';
import en from '@/lib/i18n/en';
import pt from '@/lib/i18n/pt';

const messages = {
	en: en.notFound.message,
	pt: pt.notFound.message,
};

export default function NotFound() {
	const params = useParams();
	const locale = (params?.locale as string) || 'en';
	const message = messages[locale as keyof typeof messages] ?? messages.en;

	return (
		<Main className="h-lvh flex flex-col items-center justify-center gap-4">
			<span className="w-fit text-gray-400 font-mono">[404 {message}]</span>
			<BackToHome href={`/${locale}`} />
		</Main>
	);
}
