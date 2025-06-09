
export function includesCommand(content: string, keyword: string): boolean {
	return content.toLowerCase().includes(keyword.toLowerCase());
}

export function startsWithCommand(content: string, prefix: string): boolean {
	return content.trim().toLowerCase().startsWith(prefix.toLowerCase());
}

export function getRandomCatGif<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}
