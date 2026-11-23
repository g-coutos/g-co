const en = {
	home: {
		title: 'Guilherme Couto',
		bio: {
			p1: 'Software Engineer with {years}+ years of experience.',
			p2: [
				{
					company: { name: 'Tradex', envKey: 'TRADEX_URL' },
					text: ' — I own a scoring ETL end-to-end on a trade marketing platform: the API that triggers and tracks the job on AWS Batch, and the Python/SQLAlchemy pipeline doing the heavy lifting; cut peak memory by up to 43%, closed a production race condition with idempotent upserts, and redesigned a hardcoded multi-industry rules engine into a configurable database schema.',
				},
				{
					company: { name: 'Alura', envKey: 'ALURA_URL' },
					text: ' — cut real weight from performance and codebases: 30% faster pages, 35K+ lines removed.',
				},
			],
			p3: "Now I'm going all in on Data Engineering — building reliable, large-scale data pipelines and systems.",
			p4: {
				pre: 'You can contact me on ',
				x: 'X',
				mid: ' or ',
				linkedin: 'LinkedIn',
				post: '.',
			},
		},
	},
	articles: {
		heading: 'Articles',
		noArticles: '[ 404 NO ARTICLES FOUND ]',
		minRead: 'min read',
		tableOfContents: 'On this page',
	},
	footer: {
		code: 'Code',
		rssFeed: 'RSS Feed',
	},
	nav: {
		backToHome: 'Home',
		all: 'All',
	},
	metadata: {
		siteTitle: 'Gui Couto',
		siteDescription:
			'Personal site of Guilherme Couto, a SW/Product engineer building web products end to end. Notes and articles on engineering, product, and shipping.',
	},
	notFound: {
		message: 'PAGE NOT FOUND',
	},
};

export default en;
