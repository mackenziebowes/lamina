// remark-table-to-dict.ts
import { visit } from "unist-util-visit";
import type { Root, Table, Paragraph, PhrasingContent } from "mdast";
import { toString } from "mdast-util-to-string";

/**
 * Remark plugin to convert a table following a <!--format: dict--> directive
 * into a dictionary list (<dl>).
 */
export function remarkTableToDict() {
	return (tree: Root) => {
		visit(tree, (node, index, parent) => {
			// 1. Only look for tables
			if (node.type !== "table") return;

			// 2. Check if it has a parent and a defined index
			if (!parent || index === null || index === undefined) return;

			// 3. Find the immediate previous sibling
			const previousSibling = parent.children[index - 1];

			// 4. Check if the previous sibling is our target directive
			if (
				previousSibling?.type === "html" &&
				previousSibling.value?.includes("<!--format: dict-->")
			) {
				// 5. Transform the current node (the table)
				const dlNode = transformTableToDict(node);

				// 6. Replace the table with the new DL node
				parent.children[index] = dlNode;

				// 7. Remove the directive node (the previous sibling)
				parent.children.splice(index - 1, 1);
			}
		});
	};
}

/**
 * Transforms a Markdown table node into a "dictionary list" node.
 * The first row is assumed to be headers (keys), and each subsequent row is a term (group) with definitions.
 */
function transformTableToDict(tableNode: Table): any {
	const [headerRow, ...dataRows] = tableNode.children;
	if (!headerRow) return;
	const headers = headerRow.children.map((cell) => toString(cell));

	// We will create a "root" node for our dictionary. Since there's no native 'dl' in markdown,
	// we'll create a custom node type that `remark-rehype` will know how to handle, or build raw HTML.
	// Option 1: Build a custom node structure that will be converted to <dl> later.
	// Option 2 (Simpler for now): Generate raw HTML and use an 'html' node.

	let htmlContent = "";

	for (const row of dataRows) {
		// The first cell of the data row is the "term" or group name
		const termCell = row.children[0];
		if (!termCell) continue;
		const term = toString(termCell);
		htmlContent += `<dt><strong>${escapeHtml(term)}</strong></dt>\n`;

		// The subsequent cells are the "definitions" or values for each key
		for (let i = 1; i < row.children.length; i++) {
			const defCell = row.children[i];
			if (!defCell) continue;

			const def = toString(defCell);
			// Use the header from column i as the key name
			const key = headers[i];
			if (!key) continue;
			htmlContent += `  <dd><strong>${escapeHtml(key)}:</strong> ${escapeHtml(
				def
			)}</dd>\n`;
		}
	}

	// Wrap the content in a <dl> tag
	const fullHtml = `<dl>\n${htmlContent}</dl>`;
	// Return an 'html' node that remark-rehype will pass through directly.
	return {
		type: "html",
		value: fullHtml,
	};
}

/**
 * Helper function to escape HTML special characters.
 * Crucial to prevent XSS and rendering issues.
 */
function escapeHtml(unsafe: string): string {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
