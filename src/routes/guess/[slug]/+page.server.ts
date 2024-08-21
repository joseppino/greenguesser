import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  switch(params.slug.toLowerCase()) {
		case "flowers": {
			break;
		}
		case "trees": {
			break
		}
		default: {
			error(404);
		}
  }
	// return {
	// 	post: await db.getPost(params.slug),
	// };
};