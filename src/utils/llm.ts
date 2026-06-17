import type { APIContext } from 'astro';

type LlmTextContext = Pick<APIContext, 'site' | 'url'>;

export function getHumanPageUrlForLlmText({ site, url }: LlmTextContext): string {
  const humanPath = url.pathname.replace(/\/llm\.txt\/?$/, '/') || '/';
  return new URL(humanPath, site ?? url).href;
}

export function createHumanPageNotice(humanPageUrl: string): string {
  return `> If you're a human reading this and you'd prefer the webpage, please navigate to [the webpage](${humanPageUrl}).`;
}
