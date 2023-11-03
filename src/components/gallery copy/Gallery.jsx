import { useReducer } from 'react';
import { AddImage } from './AddImage';
import style from './gallery.module.css';
import Header from './own-components/Header';
import Img from './own-components/Img';
import dummyImage from '../../assets/images/dummy-image.png';
import { reducer, initialState, useRaisedShadow } from './action';
import { Reorder, useDragControls, useMotionValue } from 'framer-motion';

const Gallery = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const dragControls = useDragControls();

	function startDrag(event) {
		console.log(event);
		dragControls.start(event, { snapToCursor: true });
	}
	const ids = state.images.map((element) => {
		return element.id;
	});
	console.log(ids);

	return (
		<div className={style['image-gallery-layout']}>
			<div className={style['image-gallery-wrap']}>
				<Header state={state} dispatch={dispatch} />
				{/* <Test /> */}
				<div className={style['image-gallery-box']}>
					<div className={style['images-grid']}>
						{state.images.length > 0 ? (
							<Reorder.Group
								as="ol"
								onPointerDown={startDrag}
								className={style.ul}
								values={state.images}
								onReorder={(reorderedImages) => {
									console.log(reorderedImages);
									dispatch({ type: 'DND', payload: reorderedImages });
								}}
							>
								{state.images.map((image) => (
									<Item
										dispatch={dispatch}
										image={image}
										state={state}
										key={image.id}
										dragControls={dragControls}
									/>
								))}
								<AddImage state={state} dispatch={dispatch} />
							</Reorder.Group>
						) : (
							<div className="photo-up">
								<div className={`${style.image}`}>
									<img src={dummyImage} alt="dummy-image" />
								</div>
							</div>
						)}
						{/* <AddImage state={state} dispatch={dispatch} /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Gallery;

const Item = ({ image, state, dispatch, dragControls }) => {
	const y = useMotionValue(0);

	const boxShadow = useRaisedShadow(y);

	return (
		<Reorder.Item
			as="div"
			className={style.li}
			id={image}
			draggable
			drag
			dragConstraints={{ left: 0, right: 300 }}
			dragElastic={1} // Adjust this value as needed
			dragSnapToOrigin={1} // S
			value={image}
			style={{ boxShadow, y }}
		>
			<Img data={image} state={state} dispatch={dispatch} />
		</Reorder.Item>
	);
};
