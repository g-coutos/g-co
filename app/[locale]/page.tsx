import Link from 'next/link';
import { Footer } from '@/components/footer';
import { LocaleToggle } from '@/components/locale-toggle';
import { Main } from '@/components/main';
import { getAllArticles } from '@/lib/articles';
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getDictionary(locale as Locale);

	const yearsOfExperience = new Date().getFullYear() - 2022;

	const articles = (await getAllArticles(locale as Locale)).sort(
		(a, b) =>
			new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
	);

	const formatDate = (dateString: string) =>
		new Date(dateString).toLocaleDateString(
			locale === 'pt' ? 'pt-BR' : 'en-US',
			{ day: '2-digit', month: '2-digit' },
		);

	const articlesByYear = articles.reduce<Record<string, typeof articles>>(
		(acc, article) => {
			const year = String(new Date(article.metadata.date).getFullYear());
			acc[year] ??= [];
			acc[year].push(article);
			return acc;
		},
		{},
	);
	const years = Object.keys(articlesByYear).sort(
		(a, b) => Number(b) - Number(a),
	);

	const companyUrls: Record<string, string> = {
		TRADEX_URL: process.env.TRADEX_URL || '',
		EC_URL: process.env.EC_URL || '',
		ALURA_URL: process.env.ALURA_URL || '',
	};

	return (
		<>
			<Main>
				<section className="mb-8 flex flex-col">
					<div className="mb-2 flex items-center justify-between">
						<h1>{t.home.title}</h1>
						<LocaleToggle locale={locale as Locale} />
					</div>

					<p className="text-gray-600">
						SWE @{' '}
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href={companyUrls.TRADEX_URL} className="underline"
						>
							Tradex
						</Link>
					</p>
				</section>

				<section>
					<p>{t.home.bio.p1.replace('{years}', String(yearsOfExperience))}</p>
					{t.home.bio.p2.map((item) => (
						<p key={item.company.name} className="my-4">
							<Link
								href={companyUrls[item.company.envKey] || ''}
								target="_blank"
								rel="noopener noreferrer"
								className="underline"
							>
								{item.company.name}
							</Link>
							{item.text}
						</p>
					))}
					<p>{t.home.bio.p3}</p>

					<p className="mt-4">
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

				<section className="mt-12">
					{articles.length > 0 ? (
						years.map((year) => (
							<div key={year} className="mt-6">
								<h3 className="text-sm font-bold">{year}</h3>
								<div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 text-sm">
									{articlesByYear[year].map((article) => (
										<div
											key={article.slug}
											className="grid grid-cols-subgrid col-span-2 py-2"
										>
											<span className="whitespace-nowrap text-gray-400">
												{formatDate(article.metadata.date)}
											</span>
											<Link
												target="_blank"
												rel="noopener noreferrer"
												href={`/${locale}/${article.slug}`}
												className="underline"
											>
												{article.metadata.title}
											</Link>
										</div>
									))}
								</div>
							</div>
						))
					) : (
						<p className="font-mono text-sm text-gray-400">
							{t.articles.noArticles}
						</p>
					)}
				</section>
			</Main>
			<Footer
				locale={locale as Locale}
				codeLabel={t.footer.code}
				rssFeedLabel={t.footer.rssFeed}
			/>
		</>
	);
}
