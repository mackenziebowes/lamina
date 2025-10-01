import { ChunkPassage } from "./chunkPassage";
import { describe, expect, it } from "bun:test";

describe("chunkPassage", () => {
	it("Splits on kitty", () => {
		const content = `
            # Before
            blah blah blah
            @==^.^==@
            ## After
            Blah Blah
        `;
		expect(ChunkPassage(content)).toBeArray();
	});
});
