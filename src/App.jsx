import { Suspense, lazy } from 'react';
import { GalleryLoader } from './components/loader';
const Gallery = lazy(() => import('./components/gallery copy 2/Gallery'));

export default function App() {
	return (
		<Suspense fallback={<GalleryLoader />}>
			<Gallery />
		</Suspense>
	);
}
