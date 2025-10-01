import type { RootContent } from "mdast";
import log from "../../core/log";

interface RenderResult {
	bodyString: string;
	componentMap: Map<string, boolean>;
}

export function renderNodeAsTSLX(node: RootContent): RenderResult {
	const componentMap = new Map<string, boolean>();
	const bodyString = renderBodyAsTSLX(node, componentMap);
	return {
		bodyString,
		componentMap,
	};
}

function renderBodyAsTSLX(
	node: RootContent,
	componentMap: Map<string, boolean>
): string {
	switch (node.type) {
		case "heading": {
			componentMap.set("Heading", true);
			const children = node.children.map(renderNodeAsTSLX).join("");
			return `<Heading as={"h${node.depth}"}>${children}</Heading>`;
		}
		case "paragraph": {
			componentMap.set("Paragraph", true);
			const children = node.children.map(renderNodeAsTSLX).join("");
			return `<p>${children}</p>`;
		}
		case "text": {
			return node.value;
		}
		case "strong": {
			const children = node.children.map(renderNodeAsTSLX).join("");
			return `<strong>${children}</strong>`;
		}
		case "emphasis": {
			const children = node.children.map(renderNodeAsTSLX).join("");
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
				const children = node.children.map(renderNodeAsTSLX).join("");
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
