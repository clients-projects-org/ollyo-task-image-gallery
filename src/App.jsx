import { Suspense, lazy } from 'react';
import { GalleryLoader } from './components/loader/Loading';
import Dnd from './components/dnd/Dnd';
import BDnd from './components/Bu-dnd/App';
const Gallery = lazy(() => import('./components/gallery'));

export default function App() {
	return <BDnd />;
	// return (
	// 	<Suspense fallback={<GalleryLoader />}>
	// 		<Gallery />
	// 	</Suspense>
	// );
}
