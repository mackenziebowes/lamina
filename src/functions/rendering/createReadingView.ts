import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
// your mdast-utils if you need custom directives/frontmatter
import { fromMarkdown } from "mdast-util-from-markdown";
import { frontmatterFromMarkdown } from "mdast-util-frontmatter";
import { remarkTableToDict } from "../minor/table-to-def";
import { directive } from "micromark-extension-directive";
import { visit } from "unist-util-visit";
import fs from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { addCss } from "../minor/prep-reading-view";

export async function mdToHtmlReading(
	targetIn: string,
	targetOut: string
): Promise<string> {
	const targetInPath = join(cwd(), targetIn);
	const targetOutPath = join(cwd(), targetOut);
	const targetFile = fs.readFileSync(targetInPath, "utf-8");
	const file = await unified()
		// parse markdown into MDAST (with frontmatter+directives enabled)
		.use(remarkParse, { extensions: [directive] })
		.use(remarkGfm)
		.use(remarkTableToDict)
		// custom MDAST transforms (e.g. process directives)
		// .use(() => (tree) => {
		// 	visit(tree, (node) => {
		// 		// example: transform custom directives here
		// 		// if (node.type === 'textDirective') { … }
		// 	});
		// })
		// MDAST → HAST
		.use(remarkRehype, { allowDangerousHtml: true })
		// HAST → HTML
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(targetFile);
	const stringedFile = String(file);
	const withCss = addCss(stringedFile);
	fs.writeFileSync(targetOutPath, withCss, "utf-8");
	return String(file);
}

/**
 * unified, remarkParse, remarkGfm
 */
