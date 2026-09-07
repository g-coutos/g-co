import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { LocaleToggle } from '@/components/locale-toggle';
import { Main } from '@/components/main';
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getDictionary(locale as Locale);

	const yearsOfExperience = new Date().getFullYear() - 2022;

	const companyUrls: Record<string, string> = {
		TRADEX_URL: process.env.TRADEX_URL || '',
		EC_URL: process.env.EC_URL || '',
		ALURA_URL: process.env.ALURA_URL || '',
	};

	return (
		<Main>
			<section className="mb-8 flex flex-col">
				<p>
					{t.home.title}
				</p>

				<p className='text-gray-600'>SWE @ <Link href={companyUrls.TRADEX_URL} className='underline'>Tradex</Link></p>
			</section>

			<section>
				<p>{t.home.bio.p1.replace('{years}', String(yearsOfExperience))}</p>
				{t.home.bio.p2.map((item) => (
					<p key={item.company.name} className='my-4'>
						<Link href={companyUrls[item.company.envKey] || ''} target="_blank" rel="noopener noreferrer" className="underline">
							{item.company.name}
						</Link>
						{item.text}
					</p>
				))}
				<p>{t.home.bio.p3}</p>

				<p className='mt-4'>
					{t.home.bio.p4.pre}
					<Link
						href={process.env.X_URL || ''}
						target="_blank"
						rel="noopener noreferrer"
						className="underline"
					>
						{t.home.bio.p4.x}
					</Link>
					{t.home.bio.p4.mid}
					<Link
						href={process.env.LINKEDIN_URL || ''}
						target="_blank"
						rel="noopener noreferrer"
						className="underline"
					>
						{t.home.bio.p4.linkedin}
					</Link>
					{t.home.bio.p4.post}
				</p>
			</section>
		</Main>
	);
}
