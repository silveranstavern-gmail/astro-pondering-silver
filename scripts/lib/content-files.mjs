import { createHash } from 'node:crypto';
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

export const DEFAULT_CONTENT_DIR = path.resolve('src/content/blog');
export const SUPPORTED_LOCALES = ['en', 'es'];
export const DEFAULT_LOCALE = 'en';

export async function listMarkdownFiles(directory) {
  const files = [];

  async function visit(currentDirectory) {
    const entries = await readdir(currentDirectory, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        await visit(entryPath);
      } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
        files.push(entryPath);
      }
    }
  }

  await visit(directory);
  return files.sort((a, b) => a.localeCompare(b));
}

export function splitMarkdown(source, filePath = 'Markdown file') {
  const match = source.match(/^---(\r?\n)([\s\S]*?)\r?\n---(\r?\n|$)/);

  if (!match) {
    throw new Error(`${filePath} does not begin with valid YAML frontmatter.`);
  }

  const data = yaml.load(match[2]) ?? {};

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(`${filePath} frontmatter must be a YAML object.`);
  }

  return {
    data,
    rawFrontmatter: match[2],
    body: source.slice(match[0].length),
    newline: match[1],
    closingNewline: match[3] || match[1],
  };
}

export async function readMarkdownEntry(filePath) {
  const source = await readFile(filePath, 'utf8');
  return {
    filePath,
    source,
    ...splitMarkdown(source, filePath),
  };
}

export function normalizeSlug(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .replace(/^\/+/, '')
    .replace(/^blog\/+/, '')
    .replace(/\/+$/, '');
}

export function toContentId(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function deriveContentId(data, filePath) {
  const existing = typeof data.contentId === 'string' ? toContentId(data.contentId) : '';
  const slug = normalizeSlug(data.slug);
  const filename = path.basename(filePath, path.extname(filePath));
  return existing || toContentId(slug) || toContentId(filename);
}

export function getPublicationYear(date, filePath = 'Content entry') {
  if (typeof date === 'string') {
    const match = date.match(/^(\d{4})-\d{2}-\d{2}/);
    if (match) {
      return match[1];
    }
  }

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(parsedDate.valueOf())) {
    throw new Error(`${filePath} has an invalid publication date.`);
  }

  return String(parsedDate.getUTCFullYear());
}

export function calculateSourceHash(entry) {
  const normalizedBody = entry.body
    .replace(/\r\n?/g, '\n')
    .trim();
  const keywords = Array.isArray(entry.data.keywords)
    ? entry.data.keywords.map((keyword) => String(keyword).trim())
    : [];
  const payload = JSON.stringify({
    title: String(entry.data.title ?? '').trim(),
    description: String(entry.data.description ?? '').trim(),
    keywords,
    body: normalizedBody,
  });

  return `sha256:${createHash('sha256').update(payload, 'utf8').digest('hex')}`;
}

export function replaceOrganizationFrontmatter(entry, { contentId, locale, slug }) {
  const newline = entry.newline;
  const existingLines = entry.rawFrontmatter.split(/\r?\n/);
  const remainingLines = existingLines.filter(
    (line) => !/^(contentId|locale):\s*/.test(line),
  );
  const normalizedSlug = normalizeSlug(slug);
  const slugIndex = remainingLines.findIndex((line) => /^slug:\s*/.test(line));

  if (slugIndex >= 0) {
    remainingLines[slugIndex] = `slug: "${normalizedSlug}"`;
  } else {
    remainingLines.push(`slug: "${normalizedSlug}"`);
  }

  const frontmatter = [
    `contentId: ${contentId}`,
    `locale: ${locale}`,
    ...remainingLines,
  ].join(newline);

  return [
    '---',
    frontmatter,
    '---',
    entry.body,
  ].join(newline);
}

export function serializeMarkdown(data, body, newline = '\n') {
  const frontmatter = yaml.dump(data, {
    forceQuotes: false,
    lineWidth: 120,
    noCompatMode: true,
    noRefs: true,
    quotingType: '"',
    sortKeys: false,
  }).trimEnd().replace(/\n/g, newline);
  const normalizedBody = body.replace(/\r\n?/g, newline);

  return `---${newline}${frontmatter}${newline}---${newline}${normalizedBody}`;
}

export async function writeMarkdownEntry(filePath, data, body, newline = '\n') {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, serializeMarkdown(data, body, newline), 'utf8');
}

export function relativePosix(root, filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

export function parseCliOptions(args) {
  const options = { positional: [] };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (!argument.startsWith('--')) {
      options.positional.push(argument);
      continue;
    }

    const [rawName, inlineValue] = argument.slice(2).split('=', 2);
    const name = rawName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

    if (inlineValue !== undefined) {
      options[name] = inlineValue;
      continue;
    }

    const next = args[index + 1];
    if (next !== undefined && !next.startsWith('--')) {
      options[name] = next;
      index += 1;
    } else {
      options[name] = true;
    }
  }

  return options;
}

export function assertInsideRoot(root, targetPath) {
  const relative = path.relative(root, targetPath);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside content root: ${targetPath}`);
  }
}
