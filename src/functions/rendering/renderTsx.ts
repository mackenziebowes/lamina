function addAtoms(reqs: Map<string, boolean>): string {
	// -- Import Statement --
	let is = `
    import { Page } from "~/devano/atoms/layout/Page";
    import { Stack } from "~/devano/atoms/layout/Stack";
    `;
	if (reqs.has("Heading")) {
		is += `import { Heading } from "~/devano/atoms/layout/Heading";`;
	}
	if (reqs.has("Card")) {
		is += `import { Card } from "~/devano/atoms/layout/Card";`;
	}
	return is;
}

function addMetaHandler(meta: Record<string, any>): string {
	// -- Meta Statement --
	let ms = ``;
	ms += `import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";`;
	ms += `const MetaInjection = () => (<MetaProvider>`;
	if (meta.title) {
		ms += `<Title>${meta.title}</Title>`;
	}
	Object.entries(meta).forEach((key, value) => {
		ms += `<Meta name="${key}" content="${value}" />`;
	});
	ms += `</MetaProvider>);`;
	return ms;
}

export function renderAsGTSXPage(
	body: string,
	meta: Record<string, any>,
	requiredComponents: Map<string, boolean>
): string {
	let importStatement = addAtoms(requiredComponents);
	let exportString = `
        ${importStatement}
    `;
	// let hasMeta = Object.keys(meta).length > 0;
	// if (hasMeta) {
	// 	exportString += addMetaHandler(meta);
	// }
	exportString += `export default function ThisPage() {
    return (
		<Page>`;
	// if (hasMeta) {
	// 	exportString += `<MetaInjection />`;
	// }
	exportString += `
            <Stack direction="col">
				${body}
			</Stack>
		</Page>
	);
}
`;
	return exportString;
}

export function RenderAsPureTSXPage(
	body: string,
	meta: Record<string, any>
): string {
	let exportString = ``;
	let hasMeta = Object.keys(meta).length > 0;
	if (hasMeta) {
		exportString += addMetaHandler(meta);
	}
	exportString += `export default function ThisPage() {
    return (
		<main>`;
	if (hasMeta) {
		exportString += `<MetaInjection />`;
	}
	exportString += `
            <div style={{"display": "flex", "flex-direction": "column", "max-width": "60ch"}}>
				${body}
			</div>
		</main>
	);`;
	return exportString;
}
