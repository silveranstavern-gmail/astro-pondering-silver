# Blog content organization design

Status: organization and translation-sync foundations implemented on 2026-06-27. The self-contained Spanish shell, publishing routes, reciprocal locale metadata, and key Spanish pages were implemented on 2026-06-28. Spanish Resources and Support pages remain optional future work.

## Decision summary

Use one recursive Astro content collection, but organize its source files by locale and original publication year:

```text
src/content/blog/
  en/
    2024/
      manifestation-beyond-visualization.md
      the-conscious-plenum.md
    2025/
      ...
    2026/
      the-light-does-not-need-all-colors-to-become-one.md
  es/
    2024/
      .gitkeep
    2025/
      .gitkeep
    2026/
      .gitkeep
```

The important design choice is not the exact folders. It is that four kinds of identity remain separate:

1. **Storage location** is for authoring convenience: `en/2026/...`.
2. **Content ID** is a stable, language-neutral key shared by translations.
3. **Public slug** controls the URL and may differ by locale.
4. **The existing `keywords` tags and dates** create discovery views; they do not determine the URL or permanently constrain the file location.

Start with `en/<year>/` even if Spanish remains experimental. An `es/` tree can contain only the posts that actually have Spanish versions; no design assumption requires every English post to be translated.

Keep the existing English URLs at `/blog/<slug>`. If Spanish posts are introduced, give them distinct URLs at `/es/blog/<localized-slug>`. Do not derive either URL from the file path.

## What the repository does today

The current implementation now supports nested source folders and translation metadata:

- `src/content.config.ts` uses `glob({ pattern: '**/*.{md,mdx}' })`, so the content collection recursively discovers Markdown and MDX at any depth.
- `astro.config.mjs` also recursively scans `src/content/blog` when adding the `llm.txt` pages to the sitemap.
- `src/pages/blog/[slug].astro` builds a page for every deployed English collection entry.
- `src/pages/blog/[slug]/llm.txt.ts` builds the corresponding plain-text page.
- `src/pages/es/blog/` publishes the Spanish archive, localized post routes, and Spanish `llm.txt` representations.
- `src/utils/blog.ts` sorts posts, filters `deploy: false`, selects a locale, and resolves locale-aware links.
- `src/layouts/SiteLayout.astro` and the shared navigation, metadata, date, card, and post components are locale-aware.
- `/es` provides a contained Spanish landing page; `/es/services`, `/resume-es`, and `/freelance-es` provide the key Spanish service and professional pages.
- `/es/rss.xml` publishes the Spanish feed, and paired pages emit reciprocal `hreflang` metadata.
- The home page, blog index, RSS feed, cards, and post route all consume the collection.
- `keywords` is already the site's tag system: the schema validates it, cards and posts render it as tag chips, tag clicks populate `/blog/?tag=...`, and the same values are included in both client-side search and `llm.txt` metadata.
- `scripts/organize-blog-content.mjs` dry-runs or applies the locale/year migration and is idempotent on the organized tree.
- `scripts/content-translations.mjs` exposes deterministic status, request, scaffold, hash, diff, and stamp operations for people and AI agents.

There are currently 22 English source posts and 21 Spanish variants:

| Publication year | Posts |
| --- | ---: |
| 2024 | 2 |
| 2025 | 13 |
| 2026 | 7 |

All 22 English posts are under `src/content/blog/en/<year>/`, have a stable `contentId` and `locale: en`, and use a bare explicit slug. Their normalized bodies and public routes were verified unchanged. The 21 translated variants are published under `src/content/blog/es/<year>/`; `ai-logos-lila-god-existence` intentionally remains English-only.

### Remaining constraints and risks

1. **File location remains a fallback in one helper.** The schema now requires an explicit one-segment slug, so valid entries no longer rely on the `post.id` fallback. Removing the fallback later would make this invariant even more explicit.
2. **The dynamic route is one URL segment.** `src/pages/blog/[slug].astro` is suitable for the current flat public slugs, not for slugs containing `/`. Source folders must not leak into `slug`.
3. **Route logic is duplicated.** `astro.config.mjs` parses raw frontmatter and independently normalizes slugs for sitemap additions, while `src/utils/blog.ts` owns the application-side normalization.
4. **The full archive is rendered at once.** The blog indexes put every post card into one HTML page, and `src/scripts/search.js` filters those cards in the browser. Folder nesting does not solve this eventual thousands-of-posts bottleneck.
5. **Featured-content configuration is still distributed.** Featured selections live in page-level configuration. Stable content IDs should remain the editorial key rather than public URLs.
6. **Tag filtering is part of free-text search.** `BlogPostCard.astro` combines title, description, and `keywords` into `data-search-text`. A tag click places its value in the search input, and `search.js` performs a case-insensitive substring match across that combined text. This is useful behavior to preserve, but it is not an exact-match tag index and cannot search posts omitted by future pagination.

## Design principles

### Storage paths are private implementation details

A file may move from:

```text
src/content/blog/example.md
```

to:

```text
src/content/blog/en/2026/example.md
```

and later to:

```text
src/content/blog/en/2026/06/example.md
```

without changing its URL, translation linkage, keywords/tags, or references from featured-content configuration.

Every published post should therefore have an explicit, validated slug. Fallback slugs are convenient while drafting, but a build intended for deployment should reject a published post whose URL depends on its path.

### Use folders for one low-ambiguity filing system

Locale and year are both single-valued, objective properties. They work well as folders. The existing `keywords` tags are many-to-many and change over time, so they work poorly as folders.

Continue using `keywords` metadata to drive tag chips and search. It can also drive future exact tag pages or indexes if needed. A post about both consciousness and AI should not need a judgment call about which folder “owns” it.

### Make translation optional per post

English-only, Spanish-only, and paired posts must all be valid. A source post opts into an expected translation with `translationTargets`; merely supporting Spanish does not turn every absent Spanish file into an error.

### Prefer deterministic state over AI guesswork

A script should tell an AI agent exactly which translations are missing, current, stale, duplicated, or orphaned. The agent can perform the linguistic work, but it should not have to infer synchronization state from timestamps or file names.

## Recommended source tree

Use locale first, then the original publication year, then a stable language-neutral file name:

```text
src/content/blog/
  en/
    2024/
    2025/
    2026/
  es/
    2024/
    2025/
    2026/
```

Only create folders that contain posts. The empty directories above are illustrative.

The file name should normally equal the post's `contentId`:

```text
en/2026/the-light-does-not-need-all-colors-to-become-one.md
es/2026/the-light-does-not-need-all-colors-to-become-one.md
```

The Spanish filename remains language-neutral even when its public Spanish slug is localized. That makes variants easy to pair in an editor, while frontmatter remains the authoritative link.

### When to add month folders

Do not add months yet. Add `01` through `12` beneath a year only when browsing a year becomes unpleasant. The recursive loader already permits this, so it is an authoring choice rather than an application architecture change.

If month folders are added, use zero-padded numbers and keep the same invariants:

```text
src/content/blog/en/2029/04/some-content-id.md
```

The year and optional month describe the original publication date, not the most recent update or translation date. All locale variants should stay in the same original year.

## Content metadata contract

The implemented schema adds stable identity and locale fields while retaining the useful existing fields:

```yaml
---
contentId: the-light-does-not-need-all-colors-to-become-one
locale: en
title: "The Light Does Not Need All Colors to Become One"
description: "..."
date: "2026-06-24"
updatedDate: "2026-06-27"
author: "Silver and GPT 5.5"
slug: the-light-does-not-need-all-colors-to-become-one
keywords:
  - non-duality
  - pluralism
deploy: true
translationTargets:
  - es
---
```

A Spanish translation shares the content ID but owns its title, description, body, and public slug:

```yaml
---
contentId: the-light-does-not-need-all-colors-to-become-one
locale: es
title: "La luz no necesita todos los colores para hacerse una"
description: "..."
date: "2026-06-24"
author: "Silver y GPT 5.5"
slug: la-luz-no-necesita-todos-los-colores
keywords:
  - no-dualidad
  - pluralismo
deploy: false
translation:
  sourceLocale: en
  sourceHash: "sha256:..."
  state: reviewed
---
```

A post originally written only in Spanish is equally valid:

```yaml
contentId: una-reflexion-original
locale: es
slug: una-reflexion-original
deploy: true
```

It has no `translation` block because it is not a translation. It can later request an English version with `translationTargets: [en]`.

### Field meanings

| Field | Purpose |
| --- | --- |
| `contentId` | Required stable ASCII/kebab-case identity. Shared by all locale variants and never changed merely because a title or file path changes. |
| `locale` | BCP 47 language tag such as `en` or `es`. It should agree with the top-level source folder. |
| `slug` | Locale-specific public URL segment. Published posts require it. New values should be bare segments, without `/blog/`. |
| `date` | Original publication date and the basis for the filing year and archive order. |
| `updatedDate` | Most recent meaningful edit to this locale variant. It does not determine translation freshness. |
| `keywords` | Existing displayed tag and search field. Keep it as the canonical tag list used by cards, post pages, query-string filtering, and `llm.txt`. |
| `deploy` | Existing publication switch. Translation scaffolds always set it to `false`. |
| `translationTargets` | Optional locales the source variant is expected to have. Missing variants are only actionable when opted in here or requested explicitly by a command. |
| `translation` | Present only on a derived locale variant. Records its source locale, synchronized source hash, and review state. |

The implementation deliberately retains `deploy` rather than mixing a publication-state migration into the folder work. A later, independent change could map:

- `deploy: false` to `status: draft`
- `deploy: true` to `status: published`

Do not rename `keywords` to `tags`: the field is already integrated throughout the site and its current name is part of the content contract. If separate SEO-only terms are ever needed, add a distinct field rather than disrupting the established tag/search behavior.

Do not combine this completed folder migration with publication-status naming changes. Improve unrelated editorial metadata in a separately verifiable change.

### Central locale configuration

Define supported and default locales once in a normal TypeScript module:

```ts
export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'es'] as const;
```

The content schema, routes, link resolver, translation checker, feeds, and layouts should all consume this definition. Avoid independent string literals spread across the project.

## Content access layer

All pages should query posts through locale-aware helpers rather than calling `getCollection('blog')` directly.

The logical API should provide operations equivalent to:

```ts
getPosts({ locale: 'en', status: 'published' })
getPostByRoute({ locale: 'es', slug: '...' })
getVariants(contentId)
resolvePostLink(post)
```

The default English blog route and index must explicitly select `en`. The Spanish route and index must explicitly select `es`. This prevents a translated entry from leaking into the wrong archive and allows the same slug in different locale namespaces.

The access layer should also perform or consume build-time indexes for:

- unique public route per locale
- unique `(contentId, locale)` pair
- all locale variants for a content ID
- published posts grouped by year
- published posts indexed by their existing `keywords`

Static page builders, RSS, featured-content selection, search indexing, and `llm.txt` routes should use the same access rules.

## URL and locale behavior

Preserve the current unprefixed English URLs:

```text
/blog/the-light-does-not-need-all-colors-to-become-one
```

Use a language prefix for translated Spanish content:

```text
/es/blog/la-luz-no-necesita-todos-los-colores
```

This keeps every language variant independently linkable and indexable. A query parameter such as `?lang=es` should not be the canonical language mechanism.

Recommended behavior:

- `/blog` lists published English posts.
- `/es/blog` lists published Spanish posts only.
- A language switch appears on a post only when a published counterpart exists.
- Selecting Spanish may be remembered as a preference, but the current URL remains the authoritative locale.
- If no translation exists, stay on the current post and say that the other language is unavailable; do not silently machine-translate or redirect.
- Do not automatically redirect a visitor solely from browser language.
- `/en/blog/...` may redirect to the existing unprefixed English URL if it is ever exposed.

The Spanish activation implemented the surrounding essentials:

- `locale` is passed into `SiteLayout` and emits the correct `<html lang>`
- each variant has a self-canonical URL
- existing pairs emit reciprocal `hreflang` alternates plus an English `x-default`
- Open Graph locale metadata is locale-aware
- `llm.txt` alternates work beneath localized routes
- Spanish RSS and sitemap entries are generated

Full-site Astro internationalization can wait. A blog-only Spanish route is compatible with later expanding the rest of the site.

## Translation synchronization protocol

The synchronization system is implemented as a local deterministic script rather than a hidden AI convention.

Available commands:

```text
npm run content:organize
npm run content:organize -- --write
npm run content:translations -- status --locale es
npm run content:translations -- status --locale es --json
npm run content:translations -- request <contentId> --locale es
npm run content:translations -- scaffold <contentId> --locale es
npm run content:translations -- diff <contentId> --locale es
npm run content:translations -- stamp <contentId> --locale es --state needs-review
npm run content:translations -- hash <contentId>
```

`content:organize` is a dry run unless `--write` is supplied. `request` opts one source into a target locale. `scaffold` creates a copied target-language draft with `deploy: false`, `translation.state: machine-draft`, and the current source hash; an AI agent must still translate its title, description, keywords, slug, and body.

### Source hash

For each translated variant, calculate a SHA-256 hash from a canonical representation of the source's translatable content:

```text
title
description
keywords
Markdown/MDX body
```

Normalize line endings to LF, normalize the `keywords` array consistently, and serialize parsed metadata consistently before hashing. Keywords are included because they are visible, searchable content and Spanish variants may localize them. Do not hash storage path, slug, author, dates, or publication status.

The translated file records the source hash that it has incorporated. The current hash is compared with that value:

| State | Meaning |
| --- | --- |
| `current` | Source exists and its calculated hash equals the translated file's recorded hash. |
| `stale` | Translation exists, but its recorded source hash differs. |
| `missing` | The source requests this target locale, but no variant exists. |
| `available` | No variant exists and the source did not request one; valid, not an error. |
| `orphan` | A translated variant references a missing source locale or content ID. |
| `duplicate` | More than one entry has the same `(contentId, locale)`. |
| `invalid` | Required metadata or path invariants fail. |

Timestamps alone are not sufficient. File copy times, rebases, formatting changes, and backdated edits make them unreliable.

### AI-agent workflow

The JSON status output is the agent contract. Each actionable item should contain:

```json
{
  "contentId": "the-light-does-not-need-all-colors-to-become-one",
  "state": "stale",
  "sourceLocale": "en",
  "targetLocale": "es",
  "sourcePath": "en/2026/...",
  "targetPath": "es/2026/...",
  "recordedSourceHash": "sha256:old",
  "currentSourceHash": "sha256:new"
}
```

For stale translations, `diff` should try to find the source revision matching the recorded hash in Git history and show the changes since that revision. If no matching committed revision is available, it should report that plainly and provide the complete source and target paths for comparison.

The safe update sequence is:

1. Run `status --json`.
2. Run `request` and `scaffold` for a selected missing target, or revise a stale target.
3. Preserve intentional target-language phrasing and target-only edits.
4. Mark machine-generated work as `translation.state: machine-draft`.
5. Keep `deploy: false` until its desired review threshold and Spanish publishing route are ready.
6. Run `stamp` only after the translation has incorporated the current source.
7. Run `status` again and then the production build.

`status` must never rewrite translations, and `stamp` must never claim freshness without an explicit target. This separation makes accidental bulk overwrites much less likely.

Implemented translation review states are:

- `machine-draft`
- `needs-review`
- `reviewed`

Publication status and translation review state should remain separate. That leaves room for intentionally publishing an AI-assisted translation while still describing its review level honestly.

### Exit behavior

For CI and agent use:

- exit `0` when all requested translations are current
- exit `1` for requested missing or stale states
- exit `2` for malformed metadata, orphaned translations, duplicate identities, or script failure

Optional translations that were never requested should not fail CI.

## Validation rules

Validation is currently divided by responsibility:

- Astro's Zod schema validates each entry's content ID, locale, slug, keywords, and translation metadata.
- The organizer validates dates, target paths, duplicate locale/content IDs, and one-segment slugs before moving.
- Translation status validates duplicates, missing sources, target relationships, and hash freshness.
- The completed migration was additionally checked for unchanged normalized bodies, unchanged existing metadata, and unchanged generated routes.

A future repository-level `content:check` command could consolidate all of these checks and add:

- public routes are unique
- folder locale equals frontmatter locale
- folder year equals the year of the original `date`
- optional month folder agrees with `date`
- only source variants declare `translationTargets`
- translation targets use supported locales and do not include their own locale
- no published machine draft is allowed unless policy explicitly permits it
- `keywords` remains an array of trimmed, non-empty display values with no case-insensitive duplicates within one post
- hero images and relative Markdown links still resolve after a move

If added, the production build can run that consolidated checker first:

```json
{
  "scripts": {
    "content:check": "node ./scripts/content-check.mjs",
    "build": "npm run content:check && astro build"
  }
}
```

It can reuse `scripts/lib/content-files.mjs`, which already uses the existing `js-yaml` dependency.

## Tags, archives, and search

### Existing keyword/tag behavior

Keep `keywords` as the single canonical field for the tag experience. The current behavior is:

- `BlogPostCard.astro` includes title, description, and every keyword in its searchable text.
- Visible keyword chips on cards set the `tag` query parameter and immediately apply the shared client-side search.
- `BlogPost.astro` links its keyword chips back to `/blog/?tag=<keyword>`.
- `search.js` initializes from either `tag` or `q`, normalizes case, and performs a substring match.
- Featured cards display a keyword preview.
- The plain-text post endpoint emits a `Keywords:` metadata line.

Preserve all of that during the folder migration. In particular, do not create a second `tags` field or require dedicated tag routes merely to reorganize source files.

Treat keywords/tags as data, not directories. A Spanish variant should have Spanish keywords when that best serves Spanish readers and search. Its post links should target the locale-aware equivalent of `/es/blog/?tag=<keyword>` rather than the currently hard-coded English blog path.

The current substring behavior means a tag query may also match the same phrase in a title or description. That is acceptable and should remain the baseline. If exact tag filtering becomes desirable, add normalized keyword data alongside the existing free-text index; do not silently change what the search box does.

At thousands of posts, a query-string filter cannot find posts that were not rendered into the current paginated HTML page. At that point, build the same `keywords` values into the locale-specific search index. Dedicated static routes such as `/blog/tag/non-duality` are an optional enhancement for permanent browsable archives and SEO, not a replacement for the current search integration.

If cross-language equivalence later matters—for example, treating English `non-duality` and Spanish `no-dualidad` as the same conceptual filter—add a small alias/taxonomy layer that maps those display values to a stable concept ID. The visible and searchable `keywords` arrays can remain intact.

### Year archives

Generate year pages from `date`, not from the path:

```text
/blog/2026
/es/blog/2026
```

This makes archive behavior correct even if a draft is temporarily misfiled, while a future consolidated `content:check` could still report the source-path mismatch.

### Thousands of posts

The current client-side archive search is appropriate for 22 posts but should not be the final thousands-of-posts design.

At an agreed threshold, add:

- paginated archive pages generated at build time
- one search index per locale containing title, description, and the existing `keywords`, rather than all card content in one HTML document
- generated year pages and, if useful, exact keyword archive pages
- only the newest or featured posts on the home page
- a search library or prebuilt static search index if substring search is no longer enough

This evolution is independent of whether files are grouped by year or month.

## Other code cleanup enabled by the design

These are useful follow-on changes, not prerequisites for moving files:

- Put slug normalization in one pure shared module usable by both `astro.config.mjs` and Astro page code.
- Replace duplicated hard-coded featured URLs with one curation list keyed by `contentId`, or an explicit featured metadata field.
- Have both HTML and `llm.txt` static paths call the same published-post selector.
- Have RSS and sitemap generation use the same locale-aware route resolver.
- Change post route parameters only if public slugs are intentionally allowed to contain `/`; otherwise keep slugs to one segment.

## Migration plan

### Phase 1: Establish invariants

Completed:

1. Added required `contentId`, `locale`, bare slug, translation-target, and translation-state validation to the schema.
2. Backfilled every current post with a stable `contentId` and `locale: en`.
3. Normalized existing frontmatter from `slug: /blog/example` to the bare `slug: example`.
4. Confirmed all migrated metadata and normalized bodies match their originals.
5. Verified the same 22 HTML and 22 `llm.txt` blog routes in the production build.

### Phase 2: Refile current English posts

Completed by `npm run content:organize -- --write`:

1. Moved all posts to `src/content/blog/en/<year>/<contentId>.md`.
2. Created tracked empty `src/content/blog/es/<year>/` folders.
3. Kept month folders deferred.
4. Confirmed the organizer now reports every migrated entry as `OK` in a dry run.
5. Ran a successful production build with the same public English routes.

### Phase 3: Make collection consumers locale-aware

Partially completed:

- `getSortedAndFilteredPosts` accepts a locale and defaults to English.
- Public link resolution includes a locale prefix for non-English variants.
- Existing HTML and `llm.txt` static paths explicitly select English.
- The raw sitemap scan excludes non-English content.

Still to do before publishing Spanish:

1. Centralize supported locale constants between application and Node scripts.
2. Add locale-aware Spanish collection pages and post routes.
3. Key featured content by `contentId`.

### Phase 4: Pilot selective Spanish

Translation tooling is complete and was fixture-tested through available, missing, current, stale, and restamped states. The publishing pilot remains:

1. Select a real post with `request`.
2. Create its Spanish draft with `scaffold` and translate it.
3. Add `/es/blog` and `/es/blog/<slug>` static routes.
4. Add language-aware layout, canonical, `hreflang`, sitemap, RSS, and `llm.txt` behavior.
5. Verify that English indexes never include Spanish entries and vice versa.

This pilot will expose the real editorial workflow before any promise to translate the full archive.

### Phase 5: Scale only when needed

Add pagination, locale search indexes, month folders, a cross-language keyword alias layer, or full-site internationalization independently as their need becomes concrete.

## Alternatives considered

| Layout | Advantages | Drawbacks | Decision |
| --- | --- | --- | --- |
| `<year>/<post>.md` | Smallest immediate change | Requires another broad move if locale trees are later adopted | Valid, but not preferred |
| `<locale>/<year>/<post>.md` | Easy locale browsing, simple bulk operations, selective translations are natural | English folder is initially redundant | **Recommended** |
| `<year>/<post>/en.md` and `es.md` | Keeps variants and local assets together | Creates one directory per post and makes browsing one locale less direct | Good if per-post asset bundles become common |
| Keyword/tag folders | Familiar visual grouping | A post can have many keywords; reorganizing them causes constant moves and would bypass the existing search integration | Reject as primary storage |
| Database or headless CMS | Strong querying and editorial UI | Adds operational complexity before the current repository needs it | Revisit only for multi-author workflows |

## Explicit non-goals

This design does not require:

- translating the whole site
- translating every blog post
- changing current public English URLs
- putting year or locale into English public URLs
- choosing an AI translation provider
- adding month folders now
- adopting a CMS

The near-term win is intentionally modest: files become easy to browse by locale and year, while stable metadata prevents that organization from becoming a future constraint.
