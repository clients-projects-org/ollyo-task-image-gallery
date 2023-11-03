import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from './use-raised-shadow';

export const Item = ({ item }) => {
	const y = useMotionValue(0);
	const boxShadow = useRaisedShadow(y);

	return (
		<Reorder.Item drag="x" value={item} id={item} style={{ boxShadow, y }}>
			<span>{item}</span>
		</Reorder.Item>
	);
};
