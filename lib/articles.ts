import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import type { Locale } from './i18n/config';
import { markdownToHtml } from './markdown-to-html';

function getArticlesDirectory(locale: Locale) {
	return path.join(process.cwd(), 'articles', locale);
}

function getReadingTime(content: string): number {
	const text = content
		.replace(/```[\s\S]*?```/g, '')
		.replace(/[#*`[\]()>_~]/g, '');
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	return Math.ceil(words / 200);
}

function toSlug(tag: string): string {
	return tag
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export async function getAllTags(locale: Locale): Promise<string[]> {
	const dir = getArticlesDirectory(locale);
	if (!fs.existsSync(dir)) return [];
	const files = fs.readdirSync(dir);
	const tags = new Set<string>();

	for (const fileName of files) {
		const filePath = path.join(dir, fileName);
		const fileContent = fs.readFileSync(filePath, 'utf8');
		const { data } = matter(fileContent);

		if (Array.isArray(data.tags)) {
			for (const tag of data.tags) {
				tags.add(toSlug(tag));
			}
		}
	}

	return Array.from(tags).sort();
}

export async function getAllArticles(locale: Locale) {
	const dir = getArticlesDirectory(locale);
	if (!fs.existsSync(dir)) return [];
	const files = fs.readdirSync(dir);

	return files
		.map((fileName) => {
			const slug = fileName.replace('.md', '');
			const filePath = path.join(dir, fileName);
			const fileContent = fs.readFileSync(filePath, 'utf8');

			const { data, content } = matter(fileContent);

			return {
				slug,
				metadata: data,
				readingTime: getReadingTime(content),
			};
		})
		.filter((article) => article.metadata.published);
}

export async function getArticlesByTag(tagSlug: string, locale: Locale) {
	const articles = await getAllArticles(locale);
	return articles.filter(
		(article) =>
			Array.isArray(article.metadata.tags) &&
			article.metadata.tags.some((tag: string) => toSlug(tag) === tagSlug),
	);
}

export async function getArticleBySlug(slug: string, locale: Locale) {
	const dir = getArticlesDirectory(locale);
	const filePath = path.join(dir, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		notFound();
	}

	const fileContent = fs.readFileSync(filePath, 'utf8');

	const { data, content } = matter(fileContent);

	const { html, headings } = await markdownToHtml(content);

	return {
		slug,
		metadata: data,
		tags: data.tags || [],
		content: html,
		headings,
		readingTime: getReadingTime(content),
	};
}
