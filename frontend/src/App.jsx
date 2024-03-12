// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Root from './features/navigation/Root';
import About from './features/navigation/About';
import SignUp from './features/signup/SignUp';
import SignIn from './features/signin/SignIn';
import Listing from './features/listing/Listing';
import Search from './features/search/Search';
import Account from './features/account/Account';
import Logout from './features/navigation/Logout';
import CurrencyFilter from './features/currencyFilter/CurrencyFilter';
import ProductDetails from './features/details/ProductDetails';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchSessionDataAndUpdateStore } from './features/signin/signInSlice'; 

// A wrapper that combines some components, so that they can be used in the Router below
function ListingWrapper() {
  return (
    <>
      <CurrencyFilter />
      <Search />
      <Listing />
    </>
  );
}

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the thunk action to fetch session data and update the store after every reload
    dispatch(fetchSessionDataAndUpdateStore());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
         
          <Route path="home" element={<ListingWrapper />} />
          <Route path="product/:productId" element={<ProductDetails/>} />
          <Route path="about" element={<About />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="account" element={<Account />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<ListingWrapper />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
