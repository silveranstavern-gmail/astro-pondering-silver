// src/utils/blog.ts
import { getCollection, type CollectionEntry } from 'astro:content';

type BlogEntry = CollectionEntry<'blog'>;
export type BlogLocale = BlogEntry['data']['locale'];

/**
 * Resolves the route slug for a blog post.
 * Handles custom slugs and generates fallback slugs from file IDs.
 */
export function resolvePostSlug(post: BlogEntry): string {
	const fallbackSlug = post.id
		.replace(/^\/+/, '')
		.replace(/^blog\//, '');

	return (post.data.slug ?? fallbackSlug)
		.replace(/^\/+/, '')
		.replace(/^blog\//, '')
		.replace(/\/$/, '');
}

/**
 * Resolves the canonical URL path for a blog post.
 */
export function resolvePostLink(post: BlogEntry): string {
	const prefix = post.data.locale === 'en' ? '/blog' : `/${post.data.locale}/blog`;
	return `${prefix}/${resolvePostSlug(post)}`;
}

/**
 * Resolves the clean text representation URL path for a blog post.
 */
export function resolvePostLlmTextLink(post: BlogEntry): string {
	return `${resolvePostLink(post)}/llm.txt`;
}

/**
 * Finds the published translation of a post in another locale.
 * Posts are paired by the stable, language-independent contentId.
 */
export function findPublishedCounterpart(
	post: BlogEntry,
	posts: BlogEntry[],
): BlogEntry | undefined {
	return posts.find((candidate) =>
		candidate.data.contentId === post.data.contentId
		&& candidate.data.locale !== post.data.locale
		&& candidate.data.deploy !== false
	);
}

/**
 * Fetches blog posts from the content collection, optionally filtering drafts.
 * Returns posts sorted by date in descending order (newest first).
 */
export async function getSortedAndFilteredPosts(
	filterDrafts = true,
	locale: BlogLocale = 'en',
): Promise<BlogEntry[]> {
	const posts = await getCollection('blog');

	return posts
		.filter((post) => post.data.locale === locale)
		.filter((post) => !filterDrafts || post.data.deploy !== false)
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
