const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&display=swap');
`;

const rootStyle = `:root {
  --bg: oklch(0.34 0.007 88.642);
  --text: oklch(0.841 0.004 106.715);
  --muted: oklch(0.72 0.014 96.59);
  --accent: oklch(0.642 0.155 50.012);
  --danger: oklch(0.642 0.155 32.012);
  --success: oklch(0.642 0.155 150.012);
  --warning: oklch(0.642 0.155 90.012);
  --info: oklch(0.642 0.155 200.012);
  --border: oklch(0.476 0.014 92.999);
  --card: oklch(0.37 0 0);
  --card-gradient: linear-gradient(
      135deg,
      oklch(0.355 0.007 78.832) 0%,
      oklch(0.367 0.011 91.066) 100%
  );
}`;

const lightStyle = `
  @media (prefers-color-scheme: light) {
      :root {
          --bg: oklch(0.973 0.007 88.642);
          --text: oklch(0.217 0.004 106.715);
          --muted: oklch(0.52 0.014 96.59);
          --accent: oklch(0.542 0.155 50.012);
          --danger: oklch(0.542 0.155 32.012);
          --success: oklch(0.542 0.125 150.012);
          --warning: oklch(0.562 0.135 90.012);
          --info: oklch(0.582 0.105 200.012);
          --border: oklch(0.876 0.014 92.999);
          --card: oklch(0.98 0 0);
          --card-gradient: linear-gradient(
              135deg,
              oklch(0.986 0.007 28.832) 0%,
              oklch(0.977 0.011 31.066) 100%
          );
      }
  }
`;

const resetStyle = `* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}`;

const htmlStyle = `html {
	font-size: 18px;
	line-height: 1.7;
	background-color: var(--bg);
	color: var(--text);
}`;

const bodyStyle = `body {
	font-family: Georgia, serif;
	max-width: 72ch;
	margin: 0 auto;
	padding: 6rem 2rem 8rem;
}`;

const headerStyles = `header {
	margin-bottom: 5rem;
	padding-bottom: 3rem;
	border-bottom: 1px solid var(--border);
}

h1 {
	font-family: Georgia, serif;
	font-size: 3rem;
	font-weight: 400;
	line-height: 1.1;
	letter-spacing: -0.02em;
	margin-bottom: 2rem;
}`;

const sectionStyles = `section {
	margin-bottom: 4rem;
}

h2 {
	font-family: "Fraunces", Georgia, serif;
	font-size: 1.75rem;
	font-weight: 600;
	margin-bottom: 1.5rem;
	padding-bottom: 0.75rem;
	border-bottom: 2px solid var(--text);
	display: inline-block;
}

p {
	margin-bottom: 1.5rem;
	max-width: 60ch;
}`;

const listStyles = `ul {
	list-style: none;
	margin-bottom: 2rem;
}

li {
	margin-bottom: 1.75rem;
	padding-left: 2rem;
	position: relative;
	max-width: 56ch;
}

li::before {
	content: "";
	position: absolute;
	left: 0;
	top: 0.6em;
	width: 6px;
	height: 6px;
	background-color: var(--accent);
	border-radius: 50%;
}

li strong {
	display: block;
	font-family: "Fraunces", Georgia, serif;
	font-size: 1.1rem;
	font-weight: 600;
	margin-bottom: 0.35rem;
	color: var(--text);
}`;

const warningStyles = `.warning {
	background: linear-gradient(135deg, #FFF9F8 0%, #FFF5F3 100%);
	border: 1px solid #F0D6D2;
	border-radius: 4px;
	padding: 1.5rem 2rem;
	margin: 2rem 0;
	max-width: 58ch;
}

.warning::before {
	content: "AVOID";
	font-family: "SF Mono", "Fira Code", monospace;
	font-size: 0.65rem;
	letter-spacing: 0.15em;
	font-weight: 600;
	color: var(--accent);
	display: block;
	margin-bottom: 0.75rem;
}`;

const footerStyles = `footer {
	margin-top: 5rem;
	padding-top: 2rem;
	border-top: 1px solid var(--border);
	font-size: 0.85rem;
	color: var(--muted);
}`;

export const style = [
  `<style type="text/css">`,
  fontImport,
  rootStyle,
  resetStyle,
  htmlStyle,
  bodyStyle,
  headerStyles,
  sectionStyles,
  listStyles,
  warningStyles,
  footerStyles,
  `</style>`,
];
