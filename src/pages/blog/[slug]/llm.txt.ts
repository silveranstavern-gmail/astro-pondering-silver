import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { createHumanPageNotice, getHumanPageUrlForLlmText } from '../../../utils/llm';
import { resolvePostSlug } from '../../../utils/blog';

type BlogEntry = CollectionEntry<'blog'>;

export async function getStaticPaths() {
  const posts = await getCollection('blog');

  return posts
    .filter((post) => post.data.locale === 'en' && post.data.deploy !== false)
    .map((post) => ({
      params: { slug: resolvePostSlug(post) },
      props: { post },
    }));
}

function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

async function getPostBody(post: BlogEntry): Promise<string> {
  if (post.body) {
    return post.body.trim();
  }

  if (post.filePath) {
    const rawMarkdown = await readFile(post.filePath, 'utf8');
    return stripFrontmatter(rawMarkdown).trim();
  }

  return '';
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function createMetadataLines(post: BlogEntry): string[] {
  const lines = [
    `Description: ${post.data.description}`,
    `Published: ${formatDate(post.data.date)}`,
  ];

  if (post.data.updatedDate) {
    lines.push(`Updated: ${formatDate(post.data.updatedDate)}`);
  }

  if (post.data.author) {
    lines.push(`Author: ${post.data.author}`);
  }

  if (post.data.keywords.length) {
    lines.push(`Keywords: ${post.data.keywords.join(', ')}`);
  }

  return lines;
}

export const GET: APIRoute = async ({ props, site, url }) => {
  const post = props.post as BlogEntry;
  const humanPageUrl = getHumanPageUrlForLlmText({ site, url });
  const body = await getPostBody(post);
  const markdown = [
    `# ${post.data.title}`,
    '',
    createHumanPageNotice(humanPageUrl),
    '',
    ...createMetadataLines(post),
    '',
    '---',
    '',
    body,
  ].join('\n').trim();

  return new Response(`${markdown}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      Link: `<${humanPageUrl}>; rel="canonical"`,
    },
  });
};
