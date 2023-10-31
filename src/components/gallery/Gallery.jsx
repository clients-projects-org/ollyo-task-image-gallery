import { useReducer, useState } from 'react';
import { AddImage } from './AddImage';
import style from './gallery.module.css';
import Header from './own-components/Header';
import Img from './own-components/Img';
import dummyImage from '../../assets/images/dummy-image.png';
import { reducer, initialState } from './action';
import { data } from 'autoprefixer';

const Gallery = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [targetIndex, setTargetIndex] = useState(null);
	const [draggedIndex, setDraggedIndex] = useState(null);

	const handleDragStart = (e, index) => {
		e.dataTransfer.setData('imageIndex', index);
		setDraggedIndex(index);
	};

	const handleDragOver = (e, index) => {
		e.preventDefault();
		setTargetIndex(index);
	};

	const handleDrop = () => {
		if (targetIndex !== null && draggedIndex !== null) {
			const newImages = [...state.images];
			const [draggedImage] = newImages.splice(draggedIndex, 1);
			newImages.splice(targetIndex, 0, draggedImage);
			dispatch({
				type: 'DND',
				payload: newImages,
			});
			setTargetIndex(null);
			setDraggedIndex(null);
		}
	};

	console.log(state.images);

	// v1
	// const handleDragStart = (e, index) => {
	// 	console.log(e.dataTransfer, index);
	// 	e.dataTransfer.setData('imageIndex', index);
	// };

	// const handleDragOver = (e) => {
	// 	e.preventDefault();
	// };

	// const handleDrop = (e, targetIndex) => {
	// 	e.preventDefault();

	// 	const sourceIndex = e.dataTransfer.getData('imageIndex');
	// 	const newImages = [...images];
	// 	const [draggedImage] = newImages.splice(sourceIndex, 1);
	// 	newImages.splice(targetIndex, 0, draggedImage);

	// 	dispatch({
	// 		type: 'DND',
	// 		payload: newImages,
	// 	});
	// };
	// v1  end
	return (
		<div className={style['image-gallery-layout']}>
			<div className={style['image-gallery-wrap']}>
				<Header state={state} dispatch={dispatch} />
				<div className={style['image-gallery-box']}>
					<div className={style['images-grid']}>
						{state.images.length > 0 ? (
							state.images.map((e, i) => (
								<Img
									key={data.id}
									data={e}
									state={state}
									dispatch={dispatch}
									handleDragOver={handleDragOver}
									handleDragStart={handleDragStart}
									handleDrop={handleDrop}
									i={i}
									setTargetIndex={setDraggedIndex}
								/>
							))
						) : (
							<div className={`${style.image}`}>
								<img src={dummyImage} alt="dummy-image" />
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
