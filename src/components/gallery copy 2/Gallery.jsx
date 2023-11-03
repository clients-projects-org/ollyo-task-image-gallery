import { useReducer } from 'react';
import { AddImage } from './AddImage';
import style from './gallery.module.css';
import Header from './own-components/Header';
import Img from './own-components/Img';
import dummyImage from '../../assets/images/dummy-image.png';
import { reducer, initialState, useRaisedShadow } from './action';
import { Reorder, useMotionValue } from 'framer-motion';

const Gallery = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className={style['image-gallery-layout']}>
			<div className={style['image-gallery-wrap']}>
				<Header state={state} dispatch={dispatch} />
				{/* <Test /> */}
				<div className={style['image-gallery-box']}>
					<div className={style['images-grid']}>
						{state.images.length > 0 ? (
							<Reorder.Group
								as="div"
								className={style.ul}
								values={state.images}
								onReorder={(reorderedImages) =>
									dispatch({ type: 'DND', payload: reorderedImages })
								}
							>
								{state.images.map((image) => (
									<Item
										dispatch={dispatch}
										image={image}
										state={state}
										key={image.id}
									/>
								))}
								<AddImage state={state} dispatch={dispatch} />
							</Reorder.Group>
						) : (
							<div className={style.ul}>
								<div className={`${style.image}`}>
									<img src={dummyImage} alt="dummy-image" />
								</div>
								<AddImage state={state} dispatch={dispatch} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Gallery;

const Item = ({ image, state, dispatch }) => {
	const y = useMotionValue(0);

	const boxShadow = useRaisedShadow(y);

	return (
		<Reorder.Item
			as="div"
			className={style.li}
			drag
			dragConstraints={{
				top: -150,
				left: -150,
				right: 150,
				bottom: 150,
			}}
			dragElastic={1}
			value={image}
			style={{ boxShadow, y }}
		>
			<Img data={image} state={state} dispatch={dispatch} />
		</Reorder.Item>
	);
};
