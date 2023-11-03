import './styles.css';
import { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { Tab } from './Tab';
import { AddIcon } from './AddIcon';
import { allIngredients, initialTabs, getNextIngredient } from './ingredients';
import { removeItem, closestItem } from './array-utils';
import { images } from '../../data';
import Img from '../gallery copy/own-components/Img';

export default function TestAnother() {
	const [tabs, setTabs] = useState(initialTabs);
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const remove = (item) => {
		if (item === selectedTab) {
			setSelectedTab(closestItem(tabs, item));
		}

		setTabs(removeItem(tabs, item));
	};

	const add = () => {
		const nextItem = getNextIngredient(tabs);

		if (nextItem) {
			setTabs([...tabs, nextItem]);
			setSelectedTab(nextItem);
		}
	};

	return (
		<div className="window">
			<nav>
				<Reorder.Group
					as="ul"
					axis="x"
					onReorder={setTabs}
					className="tabs"
					values={tabs}
				>
					<AnimatePresence initial={false}>
						{tabs.map((item) => (
							<Tab
								key={item.label}
								item={item}
								isSelected={selectedTab === item}
								onClick={() => setSelectedTab(item)}
								onRemove={() => remove(item)}
							/>
						))}

						{/* {images.map((e) => (
							<Img data={e} key={e.id} />
						))} */}
					</AnimatePresence>
				</Reorder.Group>
				{/* <motion.button
					className="add-item"
					onClick={add}
					disabled={tabs.length === allIngredients.length}
					whileTap={{ scale: 0.9 }}
				>
					<AddIcon />
				</motion.button> */}
			</nav>
			{/* <main>
				<AnimatePresence>
					<motion.div
						key={selectedTab ? selectedTab.label : 'empty'}
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.15 }}
					>
						{selectedTab ? selectedTab.icon : '😋'}
					</motion.div>
				</AnimatePresence>
			</main> */}
		</div>
	);
}
