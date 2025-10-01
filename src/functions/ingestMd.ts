import fs from "node:fs";
import { fromMarkdown } from "mdast-util-from-markdown";
import { directive } from "micromark-extension-directive"; // tokenizer
import { directiveFromMarkdown } from "mdast-util-directive"; // compiler
import { join } from "node:path";
import { cwd } from "node:process";

import log from "../core/log";

export async function ingestTarget(target: string) {
	const targetLocation = join(cwd(), target);
	if (!targetLocation || fs.statSync(targetLocation).isDirectory()) {
		throw new Error("Can't find read target");
	}
	const src = fs.readFileSync(targetLocation);
	const start = performance.now();
	const tree = fromMarkdown(src, {
		extensions: [directive()], // micromark side
		mdastExtensions: [directiveFromMarkdown()], // compile side
	});
	const end = performance.now();
	log.single.info(`Read Time`, `${end - start}ms`);
	return tree;
}
