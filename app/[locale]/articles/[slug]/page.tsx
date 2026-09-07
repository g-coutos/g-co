import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { TypographyH1 } from '@/components/typography';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { getDictionary, type Locale, locales } from '@/lib/i18n';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const article = await getArticleBySlug(slug, locale as Locale).catch(
		() => null,
	);

	if (!article) {
		return { title: 'Article not found' };
	}

	return {
		title: article.metadata.title,
		description: article.metadata.description,
	};
}

export async function generateStaticParams() {
	const params = [];

	for (const locale of locales) {
		const articles = await getAllArticles(locale);
		for (const article of articles) {
			params.push({ locale, slug: article.slug });
		}
	}

	return params;
}

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	const article = await getArticleBySlug(slug, locale as Locale);
	const t = await getDictionary(locale as Locale);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString(
			locale === 'pt' ? 'pt-BR' : 'en-US',
			{
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			},
		);
	};

	return (
		<>
			<Header backToHomeLabel={t.nav.backToHome} locale={locale}>
				<span className="w-fit block mx-auto mb-1 text-sm font-medium text-gray-500">
					{formatDate(article.metadata.date)}
				</span>
				<span className="w-fit block mx-auto mb-3 text-xs text-gray-400">
					{article.readingTime} {t.articles.minRead}
				</span>
				<TypographyH1 className="max-w-125 mx-auto text-4xl md:text-6xl text-center">
					{article.metadata.title}
				</TypographyH1>
				<ul className="max-w-125 mx-auto mt-6 flex flex-wrap justify-center gap-2">
					{article.tags.map((tag: string) => (
						<li
							key={tag}
							className="px-3 py-1 text-xs text-gray-500 border border-gray-400 rounded-full"
						>
							# {tag}
						</li>
					))}
				</ul>
			</Header>

			<Main>
				<article
					// biome-ignore lint/security/noDangerouslySetInnerHtml: This is necessary to render the HTML content of the article.
					dangerouslySetInnerHTML={{ __html: article.content }}
					className="prose prose-neutral"
				></article>
			</Main>
		</>
	);
}
