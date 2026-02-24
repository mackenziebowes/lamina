# Code Style Guidelines

## Imports

```typescript
// Node built-ins use node: prefix
import fs from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

// External packages
import { visit } from "unist-util-visit";
import { fromMarkdown } from "mdast-util-from-markdown";

// Type-only imports
import type { Root, RootContent } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";

// Internal imports (relative)
import log from "../core/log";
import { ingestTarget } from "./ingestMd";
```

**Order:** `node:*` → external packages → type imports → internal imports

## Formatting

- **Indentation:** Tabs
- **Strings:** Double quotes for imports, template literals for interpolation
- **Semicolons:** Not used (Bun/TypeScript doesn't require them)
- **Trailing commas:** Not enforced

## Types

- Use `type` for type definitions, `interface` only when extending
- Use `import type { X }` for type-only imports
- `noUncheckedIndexedAccess` is enabled - array access may return `undefined`
- Use type guards for narrowing:

```typescript
function isText(node: any): node is Text {
  return node?.type === "text" && typeof node.value === "string";
}
```

- Use non-null assertion (`!`) only when certain:

```typescript
const html = await mdToHtml(args[0]!, args[1]!);
```

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Functions | camelCase | `ingestTarget`, `extractMeta` |
| Types | PascalCase | `Command`, `Metadata` |
| Constants | camelCase | `commands`, `targetPath` |
| Files | camelCase or kebab-case | `chunkPassage.ts`, `prep-reading-view.ts` |
| Test files | `.test.ts` suffix | `chunkPassage.test.ts` |
| Directories | lowercase | `src/functions/rendering/` |

## Functions

- Export functions individually at definition:

```typescript
export async function ingestTarget(target: string) {
  // ...
}

export function extractMeta(tree: Root): Metadata {
  // ...
}
```

- Use arrow functions for inline/callbacks:

```typescript
const rendered = tree.children.map((branch) => renderNodeAsGTSX(branch));
```

- Default exports for single-export modules (like `log`)

## Testing

Use Bun's built-in test framework:

```typescript
import { describe, test, expect, it } from "bun:test";

describe("featureName", () => {
  test("Should do something", () => {
    expect(result).toBe(expected);
  });

  it("Handles edge case", () => {
    expect(array.length).toBe(2);
    expect(output).toEqual(expected);
  });
});
```

Common assertions: `toBe()`, `toEqual()`, `toBeArray()`, `toBeTruthy()`, `toThrow()`

## Error Handling

- Throw `Error` objects with descriptive messages:

```typescript
throw new Error("Can't find read target");
throw new Error(`Can't write to ${target}`);
```

- Use try/catch in CLI command handlers:

```typescript
try {
  await command.run(args);
} catch (err) {
  if (err instanceof Error) {
    log.multi.err([{ t: "Error", m: err.message }]);
  }
  process.exit(1);
}
```

- Return early for validation failures:

```typescript
if (!name) {
  log.single.err("ARGS", "No Argument Supplied");
  return;
}
```

## Async Patterns

- Use `async/await` for all async operations
- Top-level await is supported in Bun

```typescript
async function main() {
  const tree = await ingestTarget(target);
  if (tree) {
    const md = getMd(target);
    exportLLMText(md, meta, args);
  }
}
```
