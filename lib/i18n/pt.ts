const pt = {
	home: {
		title: 'Guilherme Couto',
		bio: {
			p1: 'Software Engineer com {years}+ anos de experiência.',
			p2: [
				{
					company: { name: 'Tradex', envKey: 'TRADEX_URL' },
					text: ' — sou responsável de ponta a ponta por um ETL de scoring em uma plataforma de trade marketing: a API que dispara e acompanha o job no AWS Batch, e o pipeline em Python/SQLAlchemy que faz o trabalho pesado; reduzi o pico de memória em até 43%, resolvi uma race condition em produção com upserts idempotentes, e redesenhei um motor de regras multi-indústria hardcoded para um schema de banco de dados configurável.',
				},
				{
					company: { name: 'Alura', envKey: 'ALURA_URL' },
					text: ' — reduzi peso real de performance e de código: páginas 30% mais rápidas e mais de 35K+ linhas removidas.',
				},
			],
			p3: 'Agora estou com foco total em Data Engineering — construindo pipelines e sistemas de dados confiáveis em larga escala.',
			p4: {
				pre: 'Você pode me encontrar no ',
				x: 'X',
				mid: ' ou no ',
				linkedin: 'LinkedIn',
				post: '.',
			},
		},
	},
	articles: {
		heading: 'Artigos',
		noArticles: '[ 404 SEM ARTIGOS ]',
		minRead: 'min de leitura',
		tableOfContents: 'Nesta página',
	},
	footer: {
		code: 'Code',
		rssFeed: 'RSS Feed',
	},
	nav: {
		backToHome: 'Home',
		all: 'Todos',
	},
	metadata: {
		siteTitle: 'Stack Learner by Guilherme Couto',
		siteDescription:
			'Site pessoal do Guilherme Couto, SW/Product Engineer que constrói produtos web de ponta a ponta. Notas e artigos sobre engenharia, produto e entrega.',
	},
	notFound: {
		message: 'PÁGINA NÃO ENCONTRADA',
	},
};

export default pt;
