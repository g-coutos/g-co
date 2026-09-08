import { getAllArticles } from '@/lib/articles';
import type { Locale } from '@/lib/i18n';

const SITE_URL = process.env.RSS_URL;

const channelTitles: Record<string, string> = {
	pt: 'Guilherme Couto',
	en: 'Guilherme Couto',
};

const channelLangs: Record<string, string> = {
	pt: 'pt-BR',
	en: 'en-US',
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ locale: string }> },
) {
	const { locale } = await params;
	const articles = await getAllArticles(locale as Locale);

	const sorted = articles.sort(
		(a, b) =>
			new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
	);

	const lastBuildDate =
		sorted.length > 0
			? new Date(sorted[0].metadata.date).toUTCString()
			: new Date().toUTCString();

	const items = sorted
		.map((article) => {
			const url = `${SITE_URL}/${locale}/${article.slug}`;
			const pubDate = new Date(article.metadata.date).toUTCString();
			return `
    <item>
      <title><![CDATA[${article.metadata.title}]]></title>
      <link>${url}</link>
      <description><![CDATA[${article.metadata.description ?? ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${url}</guid>
    </item>`;
		})
		.join('');

	const title = channelTitles[locale] ?? channelTitles.en;
	const lang = channelLangs[locale] ?? channelLangs.en;

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${title}]]></title>
    <link>${SITE_URL}/${locale}</link>
    <description><![CDATA[${title}]]></description>
    <language>${lang}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
}
