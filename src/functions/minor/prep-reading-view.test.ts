import { splitLines, insertAtLine } from "./prep-reading-view";
import { describe, test, expect } from "bun:test";

describe("splitLines", () => {
	test("Should split lines", () => {
		const lines = "first \nsecond";
		expect(splitLines(lines).length).toBe(2);
	});
});

describe("insertAtLine", () => {
	test("Should insert", () => {
		const base = splitLines("First\nSecond\nFourth");
		const insertion = splitLines("Third");
		const final = splitLines("First\nSecond\nThird\nFourth");
		const output = insertAtLine(2, insertion, base);
		expect(output).toEqual(final);
	});
});
