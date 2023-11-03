import { useState } from 'react';
import { ListManager } from 'react-beautiful-dnd-grid';
import './styles.css';

const list = [
	{
		id: '0',
		order: 0,
	},
	{
		id: '1',
		order: 1,
	},
	{
		id: '555',
		order: 2,
	},
	{
		id: '3',
		order: 3,
	},
	{
		id: '4',
		order: 4,
	},
	{
		id: '5',
		order: 5,
	},
	{
		id: '6',
		order: 6,
	},
	{
		id: '7',
		order: 7,
	},
	{
		id: '8',
		order: 8,
	},
	{
		id: '9',
		order: 9,
	},
];

export default function BDnd() {
	const [sortedList, setSortedList] = useState(sortList(list));

	const sortList = () => {
		setSortedList(
			[...sortedList].sort((first, second) => first.order - second.order)
		);
	};

	const reorderList = (sourceIndex, destinationIndex) => {
		console.log(sourceIndex, destinationIndex);
		if (destinationIndex === sourceIndex) {
			return;
		}
		const updatedList = [...sortedList];

		if (destinationIndex === 0) {
			updatedList[sourceIndex].order = updatedList[0].order - 1;
			sortList();
			return;
		}

		if (destinationIndex === updatedList.length - 1) {
			updatedList[sourceIndex].order =
				updatedList[updatedList.length - 1].order + 1;
			sortList();
			return;
		}

		if (destinationIndex < sourceIndex) {
			updatedList[sourceIndex].order =
				(updatedList[destinationIndex].order +
					updatedList[destinationIndex - 1].order) /
				2;
			sortList();
			return;
		}

		updatedList[sourceIndex].order =
			(updatedList[destinationIndex].order +
				updatedList[destinationIndex + 1].order) /
			2;
		sortList();
	};

	return (
		<div className="App">
			<ListManager
				items={sortedList}
				direction="horizontal"
				maxItems={4}
				render={(item) => <ListElement item={item} />}
				onDragEnd={reorderList}
			/>
		</div>
	);
}

function ListElement({ item: { id } }) {
	return (
		<div className="item">
			<div>{id}</div>
		</div>
	);
}
