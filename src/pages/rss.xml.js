import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getSortedAndFilteredPosts, resolvePostLink } from '../utils/blog';

export async function GET(context) {
	const posts = await getSortedAndFilteredPosts();

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => {
			const link = resolvePostLink(post);
			return {
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.date,
				link,
			};
		}),
	});
}
