import style from '../gallery.module.css';

export default function Img({
	data,
	state,
	dispatch,
	i,
	handleDragOver,
	handleDragStart,
	handleDrop,
	setTargetIndex,
}) {
	// console.log(state.selected);

	return (
		<div
			draggable
			// onDragStart={(e) => handleDragStart(e, i)}
			// onDragOver={handleDragOver}
			// onDrop={(e) => handleDrop(e, i)}

			onDragStart={(e) => handleDragStart(e, i)}
			onDragOver={(e) => handleDragOver(e, i)}
			onDrop={handleDrop}
			onDragEnd={() => setTargetIndex(null)}
			className={`${style.image} shadow ${
				data.selected ? style.selected : style.notSelected
			}`}
		>
			<input
				onChange={(e) =>
					dispatch({
						type: 'SELECTED',
						payload: {
							id: data.id,
							value: e.target.checked,
						},
					})
				}
				type="checkbox"
				name=""
				id=""
				checked={data.selected}
				className={style.checkboxSelect}
			/>
			<img src={data.url} alt={`Image ${data.id}`} />
		</div>
	);
}
