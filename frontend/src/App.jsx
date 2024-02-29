// frontend/src/App.jsx
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import "../index.css";
import Root from './features/navigation/Root';
import About from './features/navigation/About';
import SignUp from './features/signup/SignUp';
import SignIn from './features/signin/SignIn';
import Listing  from './features/listing/Listing';
import Cart from './features/cart/Cart';
import Search from './features/search/Search';
import Account from './features/account/Account'
import  CurrencyFilter from './features/currencyFilter/CurrencyFilter';

// A wrapper that combines some components, so that they can be used in the Router below
function ListingWrapper() {
  return (
    <>
      <CurrencyFilter />
      <Search />
      <Listing />
      <Cart />
    </>
  );
};

const router = createBrowserRouter(createRoutesFromElements(
  // The Root component contains the Header and Footer 
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="home" element={<ListingWrapper />} />
      <Route path="about" element={<About />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="account" element={<Account />} />
    </Route>

)
);

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

