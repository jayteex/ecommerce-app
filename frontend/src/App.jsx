import { Listing } from './features/listing/Listing';
import { Cart } from './features/cart/Cart';
import Search from './features/search/Search';
import "../index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './features/navigation/Root';
import About from './features/navigation/About';
import SignIn from './features/login/SignIn';

function ListingWrapper() {
	return (
		<>
			<Search />
			<Listing />
			<Cart />
		</>
	);
}

const router = createBrowserRouter(createRoutesFromElements(
	//Wrap this Root Route to create Router here 
	<Route path="/" element={<Root />}>
		<Route path="about" element={<About />} />
		<Route path="sign-in" element={<SignIn />} />
		<Route path="home" element={<ListingWrapper />} />
	</Route>
)
);

// Render the Cart component below <Inventory />
export const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

