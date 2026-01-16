# lamina

Tools for laminating / delaminating digital text.

Ie, markdown (highly editable, less readable) <- -> html (highly readable, less editable).

## Project Goals

Make it simple to write, distribute, and share ideas digitally.

## Installation

To install dependencies:

```bash
bun install
```

To add as CLI (arch/omarchy):

```bash
bun build ./index.ts --compile --outfile ~/.local/bin/lmd
```

To remove from CLI (arch/omarchy):

```bash
rm ~/.local/bin/lmd
```

## Tools

Available after adding as CLI

### Help
```
lmd -h
```

**Note:** In this version, you must explicitly type the file extension for inputs and outputs.

### MD -> HTML
Converts Markdown to HTML. Unstyled.
```
lmd html <input md> <output html>
```

### MD -> Reading HTML
Converts Markdown to HTML, styled to optimize for readability.
```
lmd r-html <input> <output>
```

### MD -> Resume HTML
Converts Markdown to HTML, styled to optimize for printing to ATS-Friendly PDF.

*Note:* 

- "cv" in the command `cv-html` stands for Curriculum Vitae which is latin for "course of life" (course as in a river - the path your life takes). 
- People who are stuffy call resumes this.
- I use it because "cv" is shorter than "resume" to type, and the number one cause of bugs is typing. Fewer strokes to help all folks.

```
lmd cv-html <input> <output>
```

### HTML -> LLM MD
Converts HTML to MD that is easier for LLMs to read.
*Note:*
Good for snagging docs for local lookup, but apparently that destroys businesses because you don't read the ads?

Use with caution, I guess.

```
lmd llm <input> <output>
```

## License

Standard MIT

## Contributing

Mwah, kisses, etc. Thanks for being interested in this stupid little tool.

### Contributing Guide

I think this is the standard flow:
1) Fork this mess
2) Make your changes
3) Document them in the changelog 
4) Make the PR
5) Who knows what happens next?

### Code Style

Prefer self-documented, modular code where applicable.
Try to separate concerns where possible.
Use descriptive variable names, even if they get long - all editors have pretty good auto complete.
Use barrel exports where possible.
