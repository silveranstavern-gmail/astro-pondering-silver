import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			author: z.string().optional(),
			keywords: z.array(z.string()).default([]),
			slug: z.string().optional(),
			deploy: z.boolean().default(true),
			heroImage: image().optional(),
		}),
});

export const collections = { blog };
