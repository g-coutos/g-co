import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import 'prismjs/themes/prism.css';

export type Heading = {
	depth: number;
	text: string;
	id: string;
};

// biome-ignore lint/suspicious/noExplicitAny: hast nodes are loosely typed here.
function nodeText(node: any): string {
	if (node.type === 'text') return node.value;
	if (Array.isArray(node.children)) return node.children.map(nodeText).join('');
	return '';
}

function collectHeadings() {
	// biome-ignore lint/suspicious/noExplicitAny: hast tree and vfile.
	return (tree: any, file: any) => {
		const headings: Heading[] = [];

		// biome-ignore lint/suspicious/noExplicitAny: hast node.
		const walk = (node: any) => {
			if (
				node.type === 'element' &&
				node.tagName === 'h2' &&
				node.properties?.id
			) {
				headings.push({
					depth: Number(node.tagName[1]),
					text: nodeText(node),
					id: String(node.properties.id),
				});
			}
			if (Array.isArray(node.children)) {
				for (const child of node.children) walk(child);
			}
		};

		walk(tree);
		file.data.headings = headings;
	};
}

export async function markdownToHtml(
	markdown: string,
): Promise<{ html: string; headings: Heading[] }> {
	const result = await remark()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(collectHeadings)
		.use(rehypePrism)
		.use(rehypeStringify)
		.process(markdown);

	return {
		html: result.toString(),
		headings: (result.data.headings as Heading[]) ?? [],
	};
}
