import type { Command } from "../core/cli";
import { getMd } from "./rendering/createLLMsText";
import { ingestTarget } from "./ingestMd";
import { exportGTSX, exportTSX, exportLLMText } from "./export";
import { extractMeta } from "./rendering/extractMeta";
import { mdToHtml } from "./rendering/createHTML";
import { mdToHtmlReading } from "./rendering/createReadingView";

export const gtsx: Command = {
	name: "g",
	description: "transform md to gesena-flavoured tsx",
	instructions:
		"indicate the relative path to the md to transform and the relative path of your desired output file (including file name and extension)",
	run: async (args) => {
		const tree = await ingestTarget(args[0]!);
		if (tree) {
			const meta = extractMeta(tree);
			exportGTSX(tree, meta, args[1]!);
		}
	},
};
export const stsx: Command = {
	name: "s",
	description: "transform md to solid-flavoured tsx",
	instructions:
		"indicate the relative path to the md to transform and the relative path of your desired output file (including file name and extension)",
	run: async (args) => {
		const tree = await ingestTarget(args[0]!);
		if (tree) {
			const meta = extractMeta(tree);
			exportTSX(tree, meta, args[1]!);
		}
	},
};

export const shtml: Command = {
	name: "html",
	description: "transform md into basic html",
	instructions:
		"indicate the relative path to the md to transform and the relative path of your desired output file (including file name and extension)",
	run: async (args) => {
		const html = await mdToHtml(args[0]!, args[1]!);
		if (html) {
			console.log("Done!");
		}
	},
};

export const rhtml: Command = {
	name: "r-html",
	description: "transform md into styled html for reading",
	instructions:
		"indicate the relative path to the md to transform and the relative path of your desired output file (including file name and extension)",
	run: async (args) => {
		const html = await mdToHtmlReading(args[0]!, args[1]!);
		if (html) {
			console.log("Done!");
		}
	},
};

export const llm: Command = {
	name: "llm",
	description: "export llm optimized md",
	instructions:
		"indicate the relative path to the md to transform at minimum. Optionally, include the location of your main llms.txt and the directory where you store your llm content.",
	run: async (args) => {
		const tree = await ingestTarget(args[0]!);
		if (tree) {
			const md = getMd(args[0]!);
			const meta = extractMeta(tree);
			exportLLMText(md, meta, args);
		}
	},
};
