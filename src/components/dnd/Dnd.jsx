import React from 'react';
import { ListManager } from 'react-beautiful-dnd-grid';

const noop = function () {};

const list = [{ id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

const ListElement = (props) => <div>id: {props.item.id}</div>;

const Dnd = () => (
	<ListManager
		items={list}
		direction="horizontal"
		maxItems={3}
		render={(item) => <ListElement item={item} />}
		onDragEnd={noop}
	/>
);

export default Dnd;
