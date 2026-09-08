import type { Metadata } from 'next';
import { Main } from '@/components/main';
import { TableOfContents } from '@/components/table-of-contents';
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
				day: '2-digit',
				month: '2-digit',
				year: '2-digit',
			},
		);
	};

	return (
		<>
			<aside className="fixed hidden lg:block">
				<TableOfContents
					headings={article.headings}
					title={article.metadata.title}
					label={t.articles.tableOfContents}
				/>
			</aside>
			<Main>
				<article>
					<h1 id="title" className="text-base font-semibold">
						{article.metadata.title}
					</h1>
					<p className="mb-10 text-sm text-gray-400">
						{formatDate(article.metadata.date)} •{' '}
						<i>
							{article.readingTime} {t.articles.minRead}
						</i>
					</p>
					<section
						// biome-ignore lint/security/noDangerouslySetInnerHtml: This is necessary to render the HTML content of the article.
						dangerouslySetInnerHTML={{ __html: article.content }}
						className="prose prose-neutral min-w-0"
					></section>
				</article>
			</Main>
		</>
	);
}
