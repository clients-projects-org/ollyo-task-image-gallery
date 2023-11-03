import { images } from '../../data';

export const allIngredients = [
	{ icon: '🍅', label: 'Tomato' },
	{ icon: '🍅', label: 'Tomato2' },
	{ icon: '🥬', label: 'Lettuce' },
	{ icon: '🧀', label: 'Cheese' },
	{ icon: '🥕', label: 'Carrot' },
	{ icon: '🍌', label: 'Banana' },
	{ icon: '🫐', label: 'Blueberries' },
	{ icon: '🥂', label: 'Champers?' },
];

const [tomato, lettuce, cheese, Tomato2] = allIngredients;
export const initialTabs = [...images];

export function getNextIngredient(ingredients) {
	const existing = new Set(ingredients);
	return allIngredients.find((ingredient) => !existing.has(ingredient));
}
