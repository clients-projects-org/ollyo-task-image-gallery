import { motion } from 'framer-motion';
import { useState } from 'react';
import style from '../gallery.module.css';
import Img from './Img';
import { useMeasurePosition } from '../action';
export default function Item({
	i,
	item,
	updatePosition,
	positions,
	state,
	dispatch,
}) {
	const [isDragging, setDragging] = useState(false);
	const ref = useMeasurePosition((pos) => updatePosition(i, pos));

	return (
		<motion.div
			ref={ref}
			layout
			initial={false}
			style={{
				background: 'white',

				borderRadius: 5,
				zIndex: isDragging ? 3 : 1,

				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				fontSize: 24,
			}}
			_dragX={0}
			_dragY={0}
			drag={true}
			onDragStart={() => setDragging(true)}
			onDragEnd={() => setDragging(false)}
			className={style.item}
			// eslint-disable-next-line no-unused-vars
			onViewportBoxUpdate={(viewportBox, _) => {
				isDragging &&
					dispatch({
						type: 'UPDATE_ORDER',
						payload: {
							i: i,
							viewportBox: viewportBox,
							positions: positions,
						},
					});
			}}
		>
			<Img data={item} state={state} dispatch={dispatch} />
		</motion.div>
	);
}
