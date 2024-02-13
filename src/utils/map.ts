/** Take any number and scale to a new number */
export function map(
	val: number,
	x1: number,
	x2: number,
	y1: number,
	y2: number,
): number {
	return ((val - x1) * (y2 - y1)) / (x2 - x1) + y1
}
