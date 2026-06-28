import { access, mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  DEFAULT_CONTENT_DIR,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  assertInsideRoot,
  deriveContentId,
  getPublicationYear,
  listMarkdownFiles,
  normalizeSlug,
  parseCliOptions,
  readMarkdownEntry,
  relativePosix,
  replaceOrganizationFrontmatter,
} from './lib/content-files.mjs';

const options = parseCliOptions(process.argv.slice(2));
const contentRoot = path.resolve(
  typeof options.contentDir === 'string' ? options.contentDir : DEFAULT_CONTENT_DIR,
);
const shouldWrite = options.write === true;

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function printHelp() {
  console.log(`Organize blog content into <locale>/<year>/<contentId>.md.

Usage:
  npm run content:organize
  npm run content:organize -- --write

Options:
  --write                 Apply the migration. Without this flag, prints a dry run.
  --content-dir <path>    Override src/content/blog (useful for testing).
  --help                  Show this help.
`);
}

if (options.help) {
  printHelp();
  process.exit(0);
}

const files = await listMarkdownFiles(contentRoot);
const plans = [];
const keys = new Map();
const years = new Set();

for (const filePath of files) {
  const entry = await readMarkdownEntry(filePath);
  const relativePath = relativePosix(contentRoot, filePath);
  const pathLocale = relativePath.split('/')[0];
  const locale = typeof entry.data.locale === 'string'
    ? entry.data.locale
    : SUPPORTED_LOCALES.includes(pathLocale)
      ? pathLocale
      : DEFAULT_LOCALE;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    throw new Error(`${relativePath} uses unsupported locale "${locale}".`);
  }

  const contentId = deriveContentId(entry.data, filePath);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(contentId)) {
    throw new Error(`${relativePath} could not produce a valid contentId.`);
  }

  const slug = normalizeSlug(entry.data.slug) || contentId;
  if (slug.includes('/')) {
    throw new Error(`${relativePath} has a nested public slug; only one URL segment is supported.`);
  }

  const year = getPublicationYear(entry.data.date, relativePath);
  const key = `${locale}:${contentId}`;
  const existingKey = keys.get(key);

  if (existingKey) {
    throw new Error(`Duplicate ${key}: ${existingKey} and ${relativePath}`);
  }
  keys.set(key, relativePath);
  years.add(year);

  const extension = path.extname(filePath).toLowerCase();
  const targetPath = path.join(contentRoot, locale, year, `${contentId}${extension}`);
  assertInsideRoot(contentRoot, targetPath);
  const updatedSource = replaceOrganizationFrontmatter(entry, {
    contentId,
    locale,
    slug,
  });

  plans.push({
    entry,
    updatedSource,
    sourcePath: filePath,
    targetPath,
    relativeSource: relativePath,
    relativeTarget: relativePosix(contentRoot, targetPath),
    contentId,
    locale,
    slug,
  });
}

for (const plan of plans) {
  if (
    plan.sourcePath !== plan.targetPath
    && await exists(plan.targetPath)
    && !plans.some((candidate) => candidate.sourcePath === plan.targetPath)
  ) {
    throw new Error(`Target already exists: ${plan.relativeTarget}`);
  }
}

for (const plan of plans) {
  const action = plan.relativeSource !== plan.relativeTarget
    ? 'MOVE'
    : plan.updatedSource !== plan.entry.source
      ? 'UPDATE'
      : 'OK';
  console.log(`${action} ${plan.relativeSource} -> ${plan.relativeTarget}`);
}

for (const year of [...years].sort()) {
  console.log(`ENSURE es/${year}/.gitkeep`);
}

if (!shouldWrite) {
  console.log(`\nDry run: ${plans.length} posts checked. Re-run with --write to apply.`);
  process.exit(0);
}

for (const plan of plans) {
  await mkdir(path.dirname(plan.targetPath), { recursive: true });

  if (plan.sourcePath !== plan.targetPath) {
    await rename(plan.sourcePath, plan.targetPath);
  }

  if (plan.updatedSource !== plan.entry.source) {
    await writeFile(plan.targetPath, plan.updatedSource, 'utf8');
  }
}

for (const year of years) {
  const spanishYearDirectory = path.join(contentRoot, 'es', year);
  const keepFile = path.join(spanishYearDirectory, '.gitkeep');
  assertInsideRoot(contentRoot, keepFile);
  await mkdir(spanishYearDirectory, { recursive: true });
  await writeFile(keepFile, '', { encoding: 'utf8', flag: 'a' });
}

console.log(`\nOrganized ${plans.length} posts and ensured ${years.size} Spanish year folders.`);
