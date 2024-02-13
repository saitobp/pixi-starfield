/** Get a random integer number between to ranges */
export function random(n1: number, n2?: number): number {
	if (n2 === undefined) {
		return Math.floor(Math.random() * n1)
	}

	return Math.floor(Math.random() * (n2 - n1 + 1)) + n1
}
