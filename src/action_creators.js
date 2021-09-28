export function place(position) {
	return {
		type: 'PLACE',
		position
	};
}

export function move() {
	return {
		type: 'MOVE'
	};
}

export function report() {
	return {
		type: 'REPORT'
	};
}
export function rotate(direction) {
	return {
		type: 'ROTATE',
		direction
	};
}