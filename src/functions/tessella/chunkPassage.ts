export function ChunkPassage(content: string) {
	const chunks = content.split("@==^.^==@").map((chunk) => chunk.trim());
	console.dir(chunks);
	return chunks;
}
