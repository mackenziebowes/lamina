import type { RootContent } from "mdast";
import log from "../../core/log";

interface RenderResult {
	bodyString: string;
	componentMap: Map<string, boolean>;
}

export function renderNodeAsGTSX(node: RootContent): RenderResult {
	const componentMap = new Map<string, boolean>();
	const bodyString = renderBodyAsGTSX(node, componentMap);
	return {
		bodyString,
		componentMap,
	};
}

export function renderNodeAsPureTSX(node: RootContent): string {
	const bodyString = renderBodyAsPureTSX(node);
	return bodyString;
}

function renderBodyAsGTSX(
	node: RootContent,
	componentMap: Map<string, boolean>
): string {
	switch (node.type) {
		case "heading": {
			componentMap.set("Heading", true);
			const children = node.children
				.map((child) => renderNodeAsGTSX(child))
				.join("");
			return `<Heading as={"h${node.depth}"}>${children}</Heading>`;
		}
		case "paragraph": {
			componentMap.set("Paragraph", true);
			const children = node.children.map(renderNodeAsGTSX).join("");
			return `<p>${children}</p>`;
		}
		case "text": {
			return node.value;
		}
		case "strong": {
			const children = node.children.map(renderNodeAsGTSX).join("");
			return `<strong>${children}</strong>`;
		}
		case "emphasis": {
			const children = node.children.map(renderNodeAsGTSX).join("");
			return `<em>${children}</em>`;
		}
		case "code": {
			componentMap.set("Code", true);
			const children = node.value;
			return `<Code lang={${node.lang}} meta={${node.meta}}}>${children}</Code>`;
		}
		case "containerDirective": {
			if (node.name === "card") {
				componentMap.set("Card", true);
				const children = node.children.map(renderNodeAsGTSX).join("");
				return `<Card>${children}</Card>`;
			}
			log.single.warn("Unknown directive", node.name);
			return "";
		}
		default: {
			log.single.warn("Unknown node type", node.type);
			return "";
		}
	}
}

function renderBodyAsPureTSX(node: RootContent): string {
	switch (node.type) {
		case "heading": {
			const children = node.children.map(renderBodyAsPureTSX).join("");
			return `<h${node.depth}>${children}</h${node.depth}>`;
		}
		case "paragraph": {
			const children = node.children.map(renderBodyAsPureTSX).join("");
			return `<p>${children}</p>`;
		}
		case "text": {
			return node.value;
		}
		case "strong": {
			const children = node.children.map(renderBodyAsPureTSX).join("");
			return `<strong>${children}</strong>`;
		}
		case "emphasis": {
			const children = node.children.map(renderBodyAsPureTSX).join("");
			return `<em>${children}</em>`;
		}
		case "code": {
			const children = node.value;
			return `<pre>${children}</pre>`;
		}
		case "containerDirective": {
			if (node.name === "card") {
				const children = node.children.map(renderBodyAsPureTSX).join("");
				return `<div>${children}</div>`;
			}
			log.single.warn("Unknown directive", node.name);
			return "";
		}
		default: {
			log.single.warn("Unknown node type", node.type);
			return "";
		}
	}
}
