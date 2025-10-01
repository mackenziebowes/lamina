import fs from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

import log from "../../core/log";

export function getMd(target: string): string {
	const targetLocation = join(cwd(), target);
	if (!targetLocation || fs.statSync(targetLocation).isDirectory()) {
		throw new Error("Can't find read target");
	}
	const src = fs.readFileSync(targetLocation, "utf8");
	return src;
}

export function createLLMsTextEntry(
	content: string,
	fileName: string,
	contentPath: string
) {
	const targetPath = join(cwd(), contentPath, fileName);
	fs.writeFileSync(targetPath, content, "utf8");
	return;
}

export function createMainLLMSText(
	target: string,
	meta: Record<string, any>,
	contentPath?: string
) {
	let llmsContent = `This project has provided pure markdown files for LLM use. A list of available filenames is available here:\n`;
	log.single.warn(
		"Domain",
		"Lamina does not know your domain - review the output to confirm the resource URIs are correct."
	);
	const fileName = target.split("/").reverse()[0]!.split(".")[0]!;
	let contentDir = contentPath ? contentPath : "/content";
	if (meta?.title) {
		llmsContent += `**${meta?.title}** - `;
	} else {
		llmsContent += `**${fileName}** - `;
	}
	if (meta?.description) {
		log.single.warn(
			"Meta Not Set",
			"LLMs work better when you indicate a description of the content of a link."
		);
		llmsContent += `${meta?.description}\n`;
	}
	llmsContent += `${contentDir}/${fileName}.md`;
	const targetPathArray = target.split("src");
	if (contentPath) {
		// Drop it in the contentPath directory if set
		const outputPath = join(cwd(), contentPath, "llms-text.md");
		fs.writeFileSync(outputPath, llmsContent, "utf8");
		return;
	}
	if (targetPathArray.length == 1) {
		// There is no src, drop it here
		fs.writeFileSync(target.split("/").reverse()[1]!, llmsContent, "utf8");
		return;
	} else {
		// There is a src, drop it in the appropriate directory
		const outputPath = join(cwd(), targetPathArray[0]!, "llms-text.md");
		fs.writeFileSync(outputPath, llmsContent, "utf8");
		return;
	}
}

export function appendMainLLMSText(
	mainFile: string,
	target: string,
	meta: Record<string, any>,
	contentPath?: string
) {
	const mainFileTextPath = join(cwd(), mainFile);
	let llmsContent = fs.readFileSync(mainFileTextPath, "utf8");
	log.single.warn(
		"Domain",
		"Lamina does not know your domain - review the output to confirm the resource URIs are correct."
	);
	const fileName = target.split("/").reverse()[0]!.split(".")[0]!;
	let contentDir = contentPath ? contentPath : "/content";
	if (meta?.title) {
		llmsContent += `**${meta?.title}** - `;
	} else {
		llmsContent += `**${fileName}** - `;
	}
	if (meta?.description) {
		log.single.warn(
			"Meta Not Set",
			"LLMs work better when you indicate a description of the content of a link."
		);
		llmsContent += `${meta?.description}\n`;
	}
	llmsContent += `${contentDir}/${fileName}.md`;
	// save to mainFileText
	fs.writeFileSync(mainFileTextPath, llmsContent, "utf8");
}
