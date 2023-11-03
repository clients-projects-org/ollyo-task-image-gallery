import { useReducer, useRef } from 'react';
import style from './gallery.module.css';
import Header from './own-components/Header';
import { initialState, reducer } from './action';
import dummyImage from '../../assets/images/dummy-image.png';
import Item from './own-components/Item';
import { AddImage } from './own-components/AddImage';
const Gallery = () => {
	const positions = useRef([]).current;
	const updatePosition = (i, offset) => (positions[i] = offset);
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className={style['image-gallery-layout']}>
			<div className={style['image-gallery-wrap']}>
				<Header state={state} dispatch={dispatch} />
				{/* <Test /> */}
				<div className={style['image-gallery-box']}>
					<div className={style['images-grid']}>
						{state.images.length > 0 ? (
							state.images.map((item, i) => (
								<Item
									key={item.id}
									item={item}
									i={i}
									positions={positions}
									updatePosition={updatePosition}
									state={state}
									dispatch={dispatch}
								/>
							))
						) : (
							<div className={style.item}>
								<div className={`${style.imageWrap}`}>
									<img src={dummyImage} alt="dummy-image" />
								</div>
							</div>
						)}
						<AddImage state={state} dispatch={dispatch} />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Gallery;
