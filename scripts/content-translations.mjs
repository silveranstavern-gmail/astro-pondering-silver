import { execFileSync } from 'node:child_process';
import path from 'node:path';
import {
  DEFAULT_CONTENT_DIR,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  assertInsideRoot,
  calculateSourceHash,
  getPublicationYear,
  listMarkdownFiles,
  normalizeSlug,
  parseCliOptions,
  readMarkdownEntry,
  relativePosix,
  splitMarkdown,
  writeMarkdownEntry,
} from './lib/content-files.mjs';

const REVIEW_STATES = ['machine-draft', 'needs-review', 'reviewed'];
const options = parseCliOptions(process.argv.slice(2));
const [command = 'status', contentIdArgument] = options.positional;
const contentRoot = path.resolve(
  typeof options.contentDir === 'string' ? options.contentDir : DEFAULT_CONTENT_DIR,
);
const targetLocale = typeof options.locale === 'string' ? options.locale : 'es';
const sourceLocale = typeof options.sourceLocale === 'string'
  ? options.sourceLocale
  : DEFAULT_LOCALE;

function printHelp() {
  console.log(`Inspect and maintain source/translation synchronization.

Usage:
  npm run content:translations -- status --locale es
  npm run content:translations -- status --locale es --json
  npm run content:translations -- request <contentId> --locale es
  npm run content:translations -- scaffold <contentId> --locale es
  npm run content:translations -- stamp <contentId> --locale es [--state reviewed]
  npm run content:translations -- diff <contentId> --locale es
  npm run content:translations -- hash <contentId> [--source-locale en]

Commands:
  status      Report current, stale, missing, available, orphan, and invalid variants.
  request     Add a locale to a source post's translationTargets.
  scaffold    Copy a source into a non-published target-language draft and record its source hash.
  stamp       Record the current source hash after a translation has been realigned.
  diff        Show source-language changes since the hash recorded by a translation.
  hash        Print the current deterministic source hash.

Options:
  --locale <locale>          Target locale (default: es).
  --source-locale <locale>   Source locale (default: en).
  --state <state>            machine-draft, needs-review, or reviewed.
  --json                     Emit machine-readable status JSON.
  --content-dir <path>       Override src/content/blog (useful for testing).
  --help                     Show this help.

The hash covers title, description, keywords, and Markdown/MDX body. Status never
writes files. Scaffold always sets deploy: false. Stamp updates synchronization
metadata only; it does not claim that a translation was linguistically reviewed.
`);
}

if (options.help) {
  printHelp();
  process.exit(0);
}

function assertLocale(locale, optionName) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    throw new Error(`${optionName} must be one of: ${SUPPORTED_LOCALES.join(', ')}`);
  }
}

assertLocale(targetLocale, '--locale');
assertLocale(sourceLocale, '--source-locale');

if (['request', 'scaffold'].includes(command) && targetLocale === sourceLocale) {
  throw new Error('Target locale must differ from source locale.');
}

async function loadEntries() {
  const files = await listMarkdownFiles(contentRoot);
  return Promise.all(files.map(async (filePath) => {
    const entry = await readMarkdownEntry(filePath);
    return {
      ...entry,
      relativePath: relativePosix(contentRoot, filePath),
      contentId: typeof entry.data.contentId === 'string' ? entry.data.contentId : '',
      locale: typeof entry.data.locale === 'string' ? entry.data.locale : '',
    };
  }));
}

function createRegistry(entries) {
  const byKey = new Map();
  const byContentId = new Map();
  const errors = [];

  for (const entry of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.contentId)) {
      errors.push({
        state: 'invalid',
        contentId: entry.contentId || null,
        locale: entry.locale || null,
        path: entry.relativePath,
        message: 'Missing or invalid contentId.',
      });
      continue;
    }

    if (!SUPPORTED_LOCALES.includes(entry.locale)) {
      errors.push({
        state: 'invalid',
        contentId: entry.contentId,
        locale: entry.locale || null,
        path: entry.relativePath,
        message: 'Missing or unsupported locale.',
      });
      continue;
    }

    const key = `${entry.contentId}:${entry.locale}`;
    const matches = byKey.get(key) ?? [];
    matches.push(entry);
    byKey.set(key, matches);

    const variants = byContentId.get(entry.contentId) ?? [];
    variants.push(entry);
    byContentId.set(entry.contentId, variants);
  }

  for (const [key, matches] of byKey) {
    if (matches.length > 1) {
      const [contentId, locale] = key.split(':');
      errors.push({
        state: 'duplicate',
        contentId,
        locale,
        paths: matches.map((entry) => entry.relativePath),
        message: `Duplicate (${contentId}, ${locale}) entries.`,
      });
    }
  }

  return { byKey, byContentId, errors };
}

function getSourceEntry(entries, contentId, locale) {
  const matches = entries.filter(
    (entry) => entry.contentId === contentId
      && entry.locale === locale
      && !entry.data.translation,
  );

  if (matches.length !== 1) {
    throw new Error(
      `Expected one ${locale} source for "${contentId}", found ${matches.length}.`,
    );
  }

  return matches[0];
}

function getTargetEntry(entries, contentId, locale) {
  const matches = entries.filter(
    (entry) => entry.contentId === contentId && entry.locale === locale,
  );

  if (matches.length > 1) {
    throw new Error(`Found duplicate ${locale} variants for "${contentId}".`);
  }

  return matches[0];
}

function collectStatus(entries, locale) {
  const registry = createRegistry(entries);
  const items = [];

  for (const [contentId, variants] of registry.byContentId) {
    const sources = variants.filter((entry) => !entry.data.translation);

    if (sources.length > 1) {
      items.push({
        state: 'invalid',
        contentId,
        targetLocale: locale,
        paths: sources.map((entry) => entry.relativePath),
        message: 'A contentId may have only one original source variant.',
      });
      continue;
    }

    const source = sources[0];
    const target = variants.find((entry) => entry.locale === locale);

    if (!source) {
      for (const variant of variants.filter((entry) => entry.locale === locale)) {
        items.push({
          state: 'orphan',
          contentId,
          sourceLocale: variant.data.translation?.sourceLocale ?? null,
          targetLocale: locale,
          targetPath: variant.relativePath,
          message: 'Translated variant has no original source variant.',
        });
      }
      continue;
    }

    if (source.locale === locale) {
      continue;
    }

    const requestedTargets = Array.isArray(source.data.translationTargets)
      ? source.data.translationTargets
      : [];
    const base = {
      contentId,
      sourceLocale: source.locale,
      targetLocale: locale,
      sourcePath: source.relativePath,
    };

    if (!target) {
      items.push({
        ...base,
        state: requestedTargets.includes(locale) ? 'missing' : 'available',
        targetPath: null,
        recordedSourceHash: null,
        currentSourceHash: calculateSourceHash(source),
      });
      continue;
    }

    const translation = target.data.translation;
    if (!translation || translation.sourceLocale !== source.locale) {
      items.push({
        ...base,
        state: 'invalid',
        targetPath: target.relativePath,
        message: translation
          ? `Translation points to ${translation.sourceLocale}, not ${source.locale}.`
          : 'Non-source locale variant is missing its translation metadata.',
      });
      continue;
    }

    const currentSourceHash = calculateSourceHash(source);
    const recordedSourceHash = typeof translation.sourceHash === 'string'
      ? translation.sourceHash
      : null;
    items.push({
      ...base,
      state: recordedSourceHash === currentSourceHash ? 'current' : 'stale',
      targetPath: target.relativePath,
      reviewState: translation.state ?? null,
      requested: requestedTargets.includes(locale),
      recordedSourceHash,
      currentSourceHash,
    });
  }

  return {
    locale,
    contentRoot,
    items: [...registry.errors, ...items].sort((a, b) => {
      const idComparison = String(a.contentId).localeCompare(String(b.contentId));
      return idComparison || String(a.state).localeCompare(String(b.state));
    }),
  };
}

function summarize(items) {
  return items.reduce((summary, item) => {
    summary[item.state] = (summary[item.state] ?? 0) + 1;
    return summary;
  }, {});
}

async function runStatus(entries) {
  const result = collectStatus(entries, targetLocale);
  const summary = summarize(result.items);
  const output = { ...result, summary };

  if (options.json) {
    console.log(JSON.stringify(output, null, 2));
  } else {
    console.log(`Translation status for ${targetLocale}:`);
    for (const state of ['current', 'stale', 'missing', 'available', 'orphan', 'duplicate', 'invalid']) {
      if (summary[state]) {
        console.log(`  ${state}: ${summary[state]}`);
      }
    }

    const actionable = result.items.filter((item) =>
      ['stale', 'missing', 'orphan', 'duplicate', 'invalid'].includes(item.state));

    if (actionable.length) {
      console.log('');
      for (const item of actionable) {
        console.log(`${item.state.toUpperCase()} ${item.contentId ?? '(unknown)'}`);
        if (item.sourcePath) console.log(`  source: ${item.sourcePath}`);
        if (item.targetPath) console.log(`  target: ${item.targetPath}`);
        if (item.message) console.log(`  ${item.message}`);
      }
    }
  }

  const hasInvalid = result.items.some((item) =>
    ['orphan', 'duplicate', 'invalid'].includes(item.state));
  const hasOutOfSync = result.items.some((item) =>
    ['stale', 'missing'].includes(item.state));
  process.exitCode = hasInvalid ? 2 : hasOutOfSync ? 1 : 0;
}

function requireContentId() {
  if (!contentIdArgument) {
    throw new Error(`${command} requires a contentId.`);
  }
  return contentIdArgument;
}

async function requestTranslation(entries) {
  const contentId = requireContentId();
  const source = getSourceEntry(entries, contentId, sourceLocale);
  const targets = new Set(
    Array.isArray(source.data.translationTargets) ? source.data.translationTargets : [],
  );
  targets.add(targetLocale);
  source.data.translationTargets = [...targets].sort();
  await writeMarkdownEntry(source.filePath, source.data, source.body, source.newline);
  console.log(`Requested ${targetLocale} translation for ${contentId}.`);
}

async function scaffoldTranslation(entries) {
  const contentId = requireContentId();
  const source = getSourceEntry(entries, contentId, sourceLocale);
  const existingTarget = getTargetEntry(entries, contentId, targetLocale);

  if (existingTarget) {
    throw new Error(`${targetLocale} variant already exists at ${existingTarget.relativePath}.`);
  }

  const year = getPublicationYear(source.data.date, source.relativePath);
  const extension = path.extname(source.filePath).toLowerCase();
  const targetPath = path.join(contentRoot, targetLocale, year, `${contentId}${extension}`);
  assertInsideRoot(contentRoot, targetPath);

  const targetData = structuredClone(source.data);
  targetData.contentId = contentId;
  targetData.locale = targetLocale;
  targetData.slug = normalizeSlug(source.data.slug) || contentId;
  targetData.deploy = false;
  delete targetData.updatedDate;
  delete targetData.translationTargets;
  delete targetData.translation;
  targetData.translation = {
    sourceLocale,
    sourceHash: calculateSourceHash(source),
    state: 'machine-draft',
  };

  const notice = `<!-- Translation scaffold copied from ${sourceLocale}. Translate title, description, keywords, slug, and body before publishing. -->`;
  await writeMarkdownEntry(
    targetPath,
    targetData,
    `${notice}\n\n${source.body}`,
    source.newline,
  );

  const targets = new Set(
    Array.isArray(source.data.translationTargets) ? source.data.translationTargets : [],
  );
  targets.add(targetLocale);
  source.data.translationTargets = [...targets].sort();
  await writeMarkdownEntry(source.filePath, source.data, source.body, source.newline);

  console.log(`Created ${relativePosix(contentRoot, targetPath)} with deploy: false.`);
  console.log(`Requested ${targetLocale} translation on ${source.relativePath}.`);
}

async function stampTranslation(entries) {
  const contentId = requireContentId();
  const target = getTargetEntry(entries, contentId, targetLocale);

  if (!target) {
    throw new Error(`No ${targetLocale} variant exists for "${contentId}".`);
  }

  const translation = target.data.translation;
  if (!translation || typeof translation.sourceLocale !== 'string') {
    throw new Error(`${target.relativePath} is missing translation.sourceLocale.`);
  }

  const source = getSourceEntry(entries, contentId, translation.sourceLocale);
  const requestedState = typeof options.state === 'string' ? options.state : translation.state;

  if (requestedState && !REVIEW_STATES.includes(requestedState)) {
    throw new Error(`--state must be one of: ${REVIEW_STATES.join(', ')}`);
  }

  target.data.translation = {
    ...translation,
    sourceHash: calculateSourceHash(source),
    state: requestedState ?? 'needs-review',
  };
  await writeMarkdownEntry(target.filePath, target.data, target.body, target.newline);
  console.log(`Stamped ${target.relativePath} from the current ${translation.sourceLocale} source.`);
}

function runGit(args) {
  return execFileSync('git', args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function findRecordedSourceCommit(source, recordedHash) {
  const repositoryPath = path.relative(process.cwd(), source.filePath).split(path.sep).join('/');
  let commits;

  try {
    commits = runGit(['log', '--format=%H', '--follow', '--', repositoryPath])
      .split(/\r?\n/)
      .filter(Boolean);
  } catch {
    return null;
  }

  for (const commit of commits) {
    try {
      const historicalSource = runGit(['show', `${commit}:${repositoryPath}`]);
      const historicalEntry = splitMarkdown(historicalSource, `${commit}:${repositoryPath}`);

      if (calculateSourceHash(historicalEntry) === recordedHash) {
        return { commit, repositoryPath };
      }
    } catch {
      // The path may have had a different name before a rename. A later commit can still match.
    }
  }

  return null;
}

async function printSourceDiff(entries) {
  const contentId = requireContentId();
  const target = getTargetEntry(entries, contentId, targetLocale);

  if (!target?.data.translation) {
    throw new Error(`No translated ${targetLocale} variant exists for "${contentId}".`);
  }

  const translation = target.data.translation;
  const source = getSourceEntry(entries, contentId, translation.sourceLocale);
  const currentSourceHash = calculateSourceHash(source);
  const recordedSourceHash = translation.sourceHash;

  if (currentSourceHash === recordedSourceHash) {
    const result = {
      contentId,
      state: 'current',
      sourcePath: source.relativePath,
      targetPath: target.relativePath,
      recordedSourceHash,
      currentSourceHash,
      diff: '',
    };
    console.log(options.json ? JSON.stringify(result, null, 2) : 'Translation already matches the current source hash.');
    return;
  }

  const baseline = findRecordedSourceCommit(source, recordedSourceHash);

  if (!baseline) {
    const result = {
      contentId,
      state: 'stale',
      sourcePath: source.relativePath,
      targetPath: target.relativePath,
      recordedSourceHash,
      currentSourceHash,
      baselineCommit: null,
      diff: null,
      message: 'The recorded source revision was not found in Git history; compare the complete source and target files.',
    };
    console.log(options.json ? JSON.stringify(result, null, 2) : [
      result.message,
      `Source: ${source.relativePath}`,
      `Target: ${target.relativePath}`,
    ].join('\n'));
    process.exitCode = 1;
    return;
  }

  const diff = runGit([
    'diff',
    '--no-ext-diff',
    '--unified=3',
    baseline.commit,
    '--',
    baseline.repositoryPath,
  ]);
  const result = {
    contentId,
    state: 'stale',
    sourcePath: source.relativePath,
    targetPath: target.relativePath,
    recordedSourceHash,
    currentSourceHash,
    baselineCommit: baseline.commit,
    diff,
  };

  if (options.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`Source changes since ${baseline.commit}:`);
    console.log(diff || '(Git found no textual diff; verify normalization-only changes.)');
  }
  process.exitCode = 1;
}

async function printHash(entries) {
  const contentId = requireContentId();
  const source = getSourceEntry(entries, contentId, sourceLocale);
  console.log(calculateSourceHash(source));
}

const entries = await loadEntries();

switch (command) {
  case 'status':
    await runStatus(entries);
    break;
  case 'request':
    await requestTranslation(entries);
    break;
  case 'scaffold':
    await scaffoldTranslation(entries);
    break;
  case 'stamp':
    await stampTranslation(entries);
    break;
  case 'diff':
    await printSourceDiff(entries);
    break;
  case 'hash':
    await printHash(entries);
    break;
  default:
    printHelp();
    throw new Error(`Unknown command "${command}".`);
}
