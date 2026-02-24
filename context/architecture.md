# Architecture

## File Organization

```
src/
├── core/           # CLI framework, logging
│   ├── cli.ts      # Command registration and routing
│   └── log.ts      # Console output formatting
├── data/           # Data handling, CSS templates
├── functions/      # Feature modules
│   ├── commands.ts # Command definitions
│   ├── export.ts   # Output writers
│   ├── ingestMd.ts # Markdown parsing
│   ├── rendering/  # Transform functions
│   ├── tessella/   # Chunking logic
│   └── minor/      # Utility functions
└── helpers/        # Shared utilities (type guards, etc.)
```

## CLI Architecture

Commands are objects implementing the `Command` type:

```typescript
export type Command = {
  name: string;
  description: string;
  instructions: string;
  run: (args: string[]) => Promise<void> | void;
};

export const shtml: Command = {
  name: "html",
  description: "transform md into basic html",
  instructions: "indicate the relative path...",
  run: async (args) => {
    // implementation
  },
};
```

Register commands in `index.ts`:

```typescript
registerCommand(cvhtml);
registerCommand(shtml);
registerCommand(rhtml);
registerCommand(llm);
```

## Key Dependencies

- `mdast-util-*` / `micromark-extension-*` - Markdown AST processing
- `unist-util-visit` - AST traversal
- `chroma-js` - Color manipulation
- `figlet` - ASCII art titles

## TypeScript Configuration

- Target: ESNext
- Module: Preserve (Bun handles bundling)
- Strict mode enabled
- `noUncheckedIndexedAccess`: Array/tuple access returns `T | undefined`
- `verbatimModuleSyntax`: Required for type-only imports
