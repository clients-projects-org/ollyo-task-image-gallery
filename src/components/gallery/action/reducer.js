import { initialState } from './initialState';

export const reducer = (state = initialState, action) => {
	const data = action.payload;
	switch (action.type) {
		case 'ADD_IMG':
			const lastId = state.images[state.images.length - 1]?.id + 1 || 1;

			const newImages = Array.from(data).map((image, i) => {
				const imageUrl = URL.createObjectURL(image);
				return {
					id: lastId + i,
					url: imageUrl,
					selected: false,
				};
			});
			if (data) {
				return {
					...state,
					images: [...state.images, ...newImages],
				};
			}
			return {
				...state,
				images: [...state.images],
			};
		case 'DELETE':
			return {
				...state,
				selected: [],
				images: state.images.filter((e) => !state.selected.includes(e.id)),
			};
		case 'SELECTED':
			const { id, value } = data;
			return {
				...state,
				selected: state.selected.includes(id)
					? state.selected.filter((e) => e !== id)
					: [...state.selected, id],
				images: state.images.map((e) => {
					if (e.id === id) {
						return {
							...e,
							selected: value,
						};
					} else
						return {
							...e,
						};
				}),
			};

		case 'DND':
			return {
				...state,
				selected: [],
				images: action.payload,
			};
		default:
			return state;
	}
};
