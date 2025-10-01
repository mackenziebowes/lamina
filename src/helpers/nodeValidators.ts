import type { ContainerDirective } from "mdast-util-directive";
import type { Paragraph, Text } from "mdast";

export function isText(node: any): node is Text {
	return node?.type === "text" && typeof node.value === "string";
}

export function isParagraph(node: any): node is Paragraph {
	return node?.type === "paragraph" && Array.isArray(node.children);
}
