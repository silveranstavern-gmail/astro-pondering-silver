// @ts-check

import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://ponderingsilver.com',
	integrations: [icon(), mdx(), react(), sitemap(), tailwind({
		applyBaseStyles: false,
	})],
});
