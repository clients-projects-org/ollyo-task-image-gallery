import './styles.css';
import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { Item } from './Item';

const initialItems = [
	'🍅 Tomato',
	'🥒 Cucumber',
	'🧀 Cheese',
	'🥬 Lettuce',
	'🍅 Tomato1',
	'🥒 Cucumber1',
	'🧀 Cheese1',
	'🥬 Lettuce1',
];

export default function Test() {
	const [items, setItems] = useState(initialItems);

	return (
		<Reorder.Group
			onReorder={setItems}
			values={items}
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(4,1fr)',
			}}
		>
			{items.map((item) => (
				<Item key={item} item={item} />
			))}
		</Reorder.Group>
	);
}
