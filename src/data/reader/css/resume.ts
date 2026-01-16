const rootStyle = `:root { --base: #F4F4F4; --text: #333333; }`;
const htmlStyle = `html { background-color: var(--base); color: var(--text); font-family: sans-serif; }`;
const bodyStyle = `body { max-width: 80ch; margin: 5dvh auto; }`;
const printStyles = `
@media print {
  @page {
    margin: 2cm; /* Standard margins for printers */
  }

  body {
    max-width: none; /* Let the paper width dictate the layout */
    margin: 0;
  }
}
`;

const breakRules = `
@media print {
  /* Prevent headers from being "orphaned" at the bottom of a page */
  h1, h2, h3, h4, dt {
    break-after: avoid;
  }

  ul li, ol li {
    break-inside: avoid;
  }

  /* Ensure paragraphs don't leave a single line at the end/start of a page */
  p {
    orphans: 3;
    widows: 3;
  }
}
`;

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
  printStyles,
  breakRules,
  `</style>`,
];
