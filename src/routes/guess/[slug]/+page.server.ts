import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { readFile } from "fs/promises";

export const load: PageServerLoad = async ({ params }) => {
	let data = {
		title: "",
		dataset: [],
	};
  switch(params.slug.toLowerCase()) {
		case "wildflowers":
			data.title = "Wildflowers";
			data.dataset = await getDataset("wildflowers");
			break;
		case "trees":
			data.title = "Trees";
			data.dataset = await getDataset("trees");
			break;
		case "fungi":
			data.title = "Fungi";
			data.dataset = await getDataset("fungi");
			break;
		default:
			error(404);
  }
	return data;
}

async function getDataset(type: string) {
	const { data, error } = await supabase
  .storage
  .from('greenguesser')
  .download(`${type}/${type}.json`);
	if(error) {
		console.log(`ERRORED ` + `${type}/${type}.json`);
		console.error(error);
	} else {
		const arrayBuffer = await data.arrayBuffer();
		const jsonString = new TextDecoder("utf-8").decode(arrayBuffer);
		const jsonObject = JSON.parse(jsonString);
		return jsonObject;
	}
	return {};
}

async function readJsonFile(path: string) {
  const file = await readFile(path, "utf8");
  return JSON.parse(file);
}

// async function getDataset(type: string) {
// 	const { data, error } = await supabase
//   .storage
//   .from('greenguesser')
//   .list(type, {
//     limit: 100,
//     offset: 0,
//     // sortBy: { column: 'name', order: 'asc' }
//   });
// 	console.log(data);
// 	console.log(error);
	
// }