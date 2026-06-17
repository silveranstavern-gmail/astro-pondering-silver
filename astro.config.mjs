// @ts-check

import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import yaml from 'js-yaml';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = 'https://ponderingsilver.com';
const pagesDir = fileURLToPath(new URL('./src/pages/', import.meta.url));
const blogDir = fileURLToPath(new URL('./src/content/blog/', import.meta.url));

function findLlmTextPages(directory = pagesDir) {
	const entries = readdirSync(directory);
	const pages = [];

	for (const entry of entries) {
		const entryPath = join(directory, entry);
		const stats = statSync(entryPath);

		if (stats.isDirectory()) {
			pages.push(...findLlmTextPages(entryPath));
			continue;
		}

		if (!/^llm\.txt\.(astro|js|jsx|ts|tsx|md|mdx)$/.test(entry)) {
			continue;
		}

		const routePath = `/${relative(pagesDir, entryPath).split(sep).join('/').replace(/\.[^.]+$/, '')}`;
		if (!routePath.includes('[')) {
			pages.push(new URL(routePath, site).href);
		}
	}

	return pages.sort();
}

function readMarkdownFrontmatter(filePath) {
	const source = readFileSync(filePath, 'utf8');
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);

	return match ? yaml.load(match[1]) ?? {} : {};
}

function findBlogLlmTextPages(directory = blogDir) {
	const entries = readdirSync(directory);
	const pages = [];

	for (const entry of entries) {
		const entryPath = join(directory, entry);
		const stats = statSync(entryPath);

		if (stats.isDirectory()) {
			pages.push(...findBlogLlmTextPages(entryPath));
			continue;
		}

		if (!/\.(md|mdx)$/.test(entry)) {
			continue;
		}

		const data = readMarkdownFrontmatter(entryPath);
		if (data && typeof data === 'object' && data.deploy === false) {
			continue;
		}

		const fallbackSlug = relative(blogDir, entryPath)
			.split(sep)
			.join('/')
			.replace(/\.(md|mdx)$/i, '');
		const rawSlug = data && typeof data === 'object' && typeof data.slug === 'string'
			? data.slug
			: fallbackSlug;
		const slug = rawSlug.replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/$/, '');

		pages.push(new URL(`/blog/${slug}/llm.txt`, site).href);
	}

	return pages.sort();
}

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [icon(), mdx(), react(), sitemap({
		customPages: [
			...findLlmTextPages(),
			...findBlogLlmTextPages(),
		],
	})],
	vite: {
		plugins: [tailwindcss()],
	},
});
