# AGENTS.md

Coding agent instructions for the Lamina codebase.

## Project Overview

Lamina (`lmd`) is a Bun-based CLI tool for transforming markdown into various output formats (HTML, TSX, llms.txt). It uses unified/remark for markdown processing and supports custom directives.

## Build/Lint/Test Commands

```bash
# Run the CLI
bun run index.ts <command> [args]

# Run all tests
bun test

# Run a single test file
bun test src/functions/tessella/chunkPassage.test.ts

# Run tests matching a pattern
bun test -t "splitLines"

# Type check
bunx tsc --noEmit

# Install dependencies
bun install
```

## Runtime: Bun (NOT Node.js)

This project uses Bun exclusively. Critical rules:

- Use `bun <file>` instead of `node <file>` or `ts-node`
- Use `bun test` instead of jest or vitest
- Use `bun install` instead of npm/pnpm/yarn
- Use `bun run <script>` instead of npm run
- Bun auto-loads `.env` files - don't use dotenv
- Use `Bun.file()` over `node:fs` readFile/writeFile when possible
- Use `node:fs` sync methods (fs.readFileSync, fs.writeFileSync) for simple file ops

## Code Style

See [context/code-style.md](context/code-style.md) for full details.

**Summary:**
- **Indentation:** Tabs
- **Strings:** Double quotes for imports, template literals for interpolation
- **Semicolons:** Not used
- **Types:** Use `type` definitions, `import type { X }` for type-only imports
- **Naming:** camelCase functions/variables, PascalCase types, `.test.ts` for tests
- **Imports order:** `node:*` → external → type imports → internal

## Architecture

See [context/architecture.md](context/architecture.md) for full details.

**Summary:**
- CLI uses `Command` type with `name`, `description`, `instructions`, `run`
- Register commands via `registerCommand()` in `index.ts`
- Key modules: `core/` (CLI, logging), `functions/` (features), `helpers/` (utilities)
- Dependencies: mdast-util-*, unist-util-visit, chroma-js, figlet
