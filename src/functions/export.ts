import fs from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { renderNodeAsGTSX, renderNodeAsPureTSX } from "./rendering/renderTree";
import { renderAsGTSXPage, RenderAsPureTSXPage } from "./rendering/renderTsx";
import {
	createMainLLMSText,
	appendMainLLMSText,
	createLLMsTextEntry,
} from "./rendering/createLLMsText";
import type { Root } from "mdast";
import log from "../core/log";

export function exportGTSX(
	tree: Root,
	meta: Record<string, any>,
	target: string
) {
	const targetPath = join(cwd(), target);
	if (!targetPath) {
		throw new Error(`Can't write to ${target}`);
	}
	let start = performance.now();
	let rendered = tree.children.map((branch) => renderNodeAsGTSX(branch));
	const renderedBody = rendered.map((res) => res.bodyString).join("");
	const renderedComponentMap = rendered
		.map((res) => res.componentMap)
		.reduce((combinedMap, currentMap) => {
			currentMap.forEach((value, key) => combinedMap.set(key, value));
			return combinedMap;
		}, new Map());
	let tsx = renderAsGTSXPage(renderedBody, meta, renderedComponentMap);
	let end = performance.now();
	log.single.info(`Render Time`, `${end - start}ms`);
	fs.writeFileSync(targetPath, tsx, "utf8");
}

export function exportTSX(
	tree: Root,
	meta: Record<string, any>,
	target: string
) {
	const targetPath = join(cwd(), target);
	if (!targetPath) {
		throw new Error(`Can't write to ${target}`);
	}
	let start = performance.now();
	let rendered = tree.children.map((branch) => renderNodeAsPureTSX(branch));
	let tsx = RenderAsPureTSXPage(rendered.join(""), meta);
	let end = performance.now();
	log.single.info(`Render Time`, `${end - start}ms`);
	fs.writeFileSync(targetPath, tsx, "utf8");
}

export function exportLLMText(
	md: string,
	meta: Record<string, any>,
	args: string[]
) {
	if (args.length == 1) {
		// no main llms.txt provided, we have to create it and add it.
		// no content folder provided, we have to create it.
		// first, we try to find src in the args[0] or cwd path
		const targetPath = join(cwd(), args[0]!);
		createMainLLMSText(targetPath, meta);
		const fileName = meta?.title
			? `${meta?.title}.md`
			: args[0]!.split(".")[0]!;
		createLLMsTextEntry(md, fileName, "/content/");
	}
	if (args.length == 2) {
		// llms.txt provided, we have to append it.
		// no content folder provided, we have to create it.
		const targetPath = join(cwd(), args[0]!);
		appendMainLLMSText(args[1]!, targetPath, meta);
		const fileName = meta?.title
			? `${meta?.title}.md`
			: args[0]!.split(".")[0]!;
		createLLMsTextEntry(md, fileName, "/content/");
	}
	if (args.length == 3) {
		// llms.txt provided, we have to append it.
		// content folder provided, we output there.
		const targetPath = join(cwd(), args[0]!);
		appendMainLLMSText(args[1]!, targetPath, meta, args[2]!);
		const fileName = meta?.title
			? `${meta?.title}.md`
			: args[0]!.split(".")[0]!;
		createLLMsTextEntry(md, fileName, args[2]!);
	}
}
