import rss from '@astrojs/rss';
import { getSortedAndFilteredPosts, resolvePostLink } from '../../utils/blog';

export async function GET(context) {
  const posts = await getSortedAndFilteredPosts(true, 'es');

  return rss({
    title: 'Pondering Silver en español',
    description: 'Escritos, reflexiones y transmisiones recientes de Pondering Silver en español.',
    site: context.site,
    customData: '<language>es-CO</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: resolvePostLink(post),
    })),
  });
}
