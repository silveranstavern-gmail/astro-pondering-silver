// src/utils/blog.ts
import { getCollection, type CollectionEntry } from 'astro:content';

type BlogEntry = CollectionEntry<'blog'>;

/**
 * Resolves the canonical URL path for a blog post.
 * Handles custom slugs and generates fallback slugs from file IDs.
 */
export function resolvePostLink(post: BlogEntry): string {
	const fallbackSlug = (post.slug ?? post.id.replace(/\.(md|mdx)$/i, ''))
		.replace(/^\/+/, '')
		.replace(/^blog\//, '');

	if (post.data.slug) {
		// If slug starts with /blog/, use it as-is, otherwise add /blog/ prefix
		return post.data.slug.startsWith('/blog/')
			? post.data.slug
			: `/blog/${post.data.slug}`;
	}
	return `/blog/${fallbackSlug}`;
}

/**
 * Fetches blog posts from the content collection, optionally filtering drafts.
 * Returns posts sorted by date in descending order (newest first).
 */
export async function getSortedAndFilteredPosts(
	filterDrafts = true,
): Promise<BlogEntry[]> {
	const posts = await getCollection('blog');

	return posts
		.filter((post) => !filterDrafts || post.data.deploy !== false)
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
