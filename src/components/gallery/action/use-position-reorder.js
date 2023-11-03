import { clamp } from 'popmotion';

const margin = 0;

export const findIndex = (i, currentBox, positions) => {
	let target = i;
	const { left, width, top, height } = positions[i];
	let bottom = top + height;

	console.log(bottom);

	currentBox.x.center = (currentBox.x.min + currentBox.x.max) / 2;
	currentBox.y.center = (currentBox.y.min + currentBox.y.max) / 2;

	// If current within same row
	if (
		currentBox.y.center > top - margin &&
		currentBox.y.center < bottom + margin
	) {
		// Moving right
		if (currentBox.x.center > left + width / 2) {
			const nextItem = positions[i + 1];
			if (nextItem === undefined || nextItem.top !== top) return i; // If end of array or not in same row
			if (currentBox.x.center > nextItem.left + nextItem.width / 2) {
				target = i + 1;
			}
			// Moving left
		} else if (currentBox.x.center < left + width / 2) {
			const prevItem = positions[i - 1];
			if (prevItem === undefined || prevItem.top !== top) return i; // If beginning of array or not in same row
			if (currentBox.x.center < prevItem.left + prevItem.width / 2) {
				target = i - 1;
			}
		}
		return target;
	}

	// If current going to row above
	if (currentBox.y.center < top - margin) {
		// Add index to positions array
		const indexedPositions = positions.map((el, i) => {
			return { ...el, i };
		});

		// Get box directly above
		const boxesAbove = indexedPositions.filter(
			(el) => el.left === left && el.top < top
		);
		const boxAbove = boxesAbove[boxesAbove.length - 1];
		if (boxAbove === undefined) return target;

		// Return box to right if slightly right of center, else return box above
		if (boxAbove.left + boxAbove.width / 2 < currentBox.x.center) {
			return boxAbove.i + 1;
		} else if (boxAbove.left + boxAbove.width / 2 >= currentBox.x.center) {
			return boxAbove.i;
		}

		return target;
	}

	// If current going to row below
	if (currentBox.y.center > bottom + margin) {
		// Add index to positions array
		const indexedPositions = positions.map((el, i) => {
			return { ...el, i };
		});

		// Get box directly above
		const boxesBelow = indexedPositions.filter(
			(el) => el.left === left && el.top > top
		);
		const boxBelow = boxesBelow[0];
		if (boxBelow === undefined) return target;

		// Return box to left if slightly left of center, else return box below
		if (boxBelow.left + boxBelow.width / 2 <= currentBox.x.center) {
			return boxBelow.i;
		} else if (boxBelow.left + boxBelow.width / 2 > currentBox.x.center) {
			return boxBelow.i - 1;
		}
		return target;
	}

	return clamp(0, positions.length, target);
};
