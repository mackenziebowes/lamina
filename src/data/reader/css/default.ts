const rootStyle = `:root { --base: #ECECE0; --text: #333333; }`;
const htmlStyle = `html { background-color: var(--base); color: var(--text); font-family: sans-serif; }`;
const bodyStyle = `body { max-width: 80ch; margin: 5dvh auto; }`;
const restOfTheStyles = `
p { line-height: 150%; max-width: 60ch; }
ul { max-width: 60ch; padding-left: 2ch; }
ul li { margin-bottom: 1ch; }
dl dt { font-size: larger; margin: 1ch 0; }
dl dd { max-width: 60ch; padding-left: 2ch; padding-bottom: 1ch; }
`;

export const style = [
	`<style type="text/css">`,
	rootStyle,
	htmlStyle,
	bodyStyle,
	restOfTheStyles,
	`</style>`,
];
