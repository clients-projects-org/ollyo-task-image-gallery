import { Suspense, lazy } from 'react';
import { GalleryLoader } from './components/loader';
import Test from './components/f-test/App';
import TestAnother from './components/left-tab/App';
const Gallery = lazy(() => import('./components/gallery copy/Gallery'));

export default function App() {
	return (
		<div>
			<Suspense fallback={<GalleryLoader />}>
				{/* <Gallery /> */}
				<Test />
			</Suspense>
			<TestAnother />
		</div>
	);
}
