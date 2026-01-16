#!/usr/bin/env bun
import { runCLI, registerCommand } from "./src/core/cli";
import { shtml, llm, rhtml, cvhtml } from "./src/functions/commands";

async function main() {
  registerCommand(cvhtml);
  registerCommand(shtml);
  registerCommand(rhtml);
  registerCommand(llm);
  runCLI();
}

main();
