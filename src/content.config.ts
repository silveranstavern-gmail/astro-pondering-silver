import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locale = z.enum(['en', 'es']);

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			contentId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
			locale: locale,
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			author: z.string().optional(),
			keywords: z.array(z.string().trim().min(1)).default([]),
			slug: z.string().trim().min(1).refine((slug) => !slug.includes('/'), {
				message: 'Blog slugs must be a single bare URL segment.',
			}),
			deploy: z.boolean().default(true),
			heroImage: image().optional(),
			translationTargets: z.array(locale).default([]),
			translation: z.object({
				sourceLocale: locale,
				sourceHash: z.string().regex(/^sha256:[a-f0-9]{64}$/),
				state: z.enum(['machine-draft', 'needs-review', 'reviewed']),
			}).optional(),
		}),
});

export const collections = { blog };
