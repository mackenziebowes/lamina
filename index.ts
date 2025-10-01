#!/usr/bin/env bun
import { runCLI, registerCommand } from "./src/core/cli";
import { gtsx, shtml, stsx, llm, rhtml } from "./src/functions/commands";

async function main() {
	// registerCommand(gtsx);
	registerCommand(stsx);
	registerCommand(shtml);
	registerCommand(rhtml);
	registerCommand(llm);
	runCLI();
}

main();
