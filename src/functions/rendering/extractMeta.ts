import type {
	Root,
	RootContent,
	Heading,
	Paragraph,
	Text,
	Strong,
} from "mdast";
import { visit } from "unist-util-visit";

import type { ContainerDirective } from "mdast-util-directive";

function isText(node: any): node is Text {
	return node?.type === "text" && typeof node.value === "string";
}

function isParagraph(node: any): node is Paragraph {
	return node?.type === "paragraph" && Array.isArray(node.children);
}

// interface Metadata {
// 	title?: string;
// 	description?: string;
// 	// -- Open Graph --
// 	"og:title"?: string;
// 	"og:type"?: string;
// 	"og:image"?: string;
// 	"og:image:secure_url"?: string;
// 	"og:image:type"?: string;
// 	"og:image:width"?: string;
// 	"og:image:height"?: string;
// 	"og:image:alt"?: string;
// 	"og:url"?: string;
// 	"og:description"?: string;
// 	"og:determiner"?: "a" | "an" | "the" | "" | "auto";
// 	"og:locale"?: string;
// 	"og:locale_alternate"?: string[];
// 	"og:site_name"?: string;
// 	"og:audio"?: string;
// 	"og:audio:secure_url"?: string;
// 	"og:audio:type"?: string;
// 	"og:video"?: string;
// 	"og:video:secure_url"?: string;
// 	"og:video:type"?: string;
// 	"og:video:width"?: string;
// 	"og:video:height"?: string;
// 	"og:article:published_time"?: string;
// 	"og:article:modified_time"?: string;
// 	"og:article:expiration_time"?: string;
// 	"og:article:author"?: string[];
// 	"og:article:section"?: string;
// 	"og:article:tag"?: string[];
// 	"og:book:author"?: string[];
// 	"og:book:isbn"?: string;
// 	"og:book:release_date"?: string;
// 	"og:profile:first_name"?: string;
// 	"og:profile:last_name"?: string;
// 	"og:profile:gender"?: "male" | "female";
// 	"og:music:duration"?: number;
// 	"og:music:album"?: string;
// 	"og:music:album:disc"?: string;
// 	"og:music:album:track"?: string;
// 	"og:music:musician"?: string;
// 	"og:music:release_date"?: string;
// 	// todo: reverse pointer threading for og:music:track, og:music:song
// 	// todo: video
// 	"twitter:card"?: string;
// 	"twitter:site"?: string;
// 	"twitter:title"?: string;
// 	"twitter:description"?: string;
// 	"twitter:image"?: string;
// }
type Metadata = Record<string, string | number | string[]>;

export function extractMeta(tree: Root): Metadata {
	const meta: Metadata = {};
	visit(tree, (node) => {
		if (node.type === "containerDirective" && node.name === "meta") {
			for (const child of node.children ?? []) {
				if (child.type === "paragraph") {
					for (const grand of child.children ?? []) {
						if (grand.type === "text" && typeof grand.value === "string") {
							const [key, ...rest] = grand.value.split(/:\s*/);
							if (key && rest.length) {
								meta[key.trim()] = rest.join(":").trim();
							}
						}
					}
				}
			}
		}
	});
	return meta;
}
