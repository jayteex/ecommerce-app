// frontend/src/features/navigation/Logout.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInRequest, signInSuccess } from "../signin/signInSlice";

export default function Logout() {

  const dispatch = useDispatch();

  // Updating the store and localStorage
  useEffect(() => {
    dispatch(signInRequest());
    dispatch(signInSuccess(null));
    localStorage.removeItem('user');
  }, []);

  return (
    <>
      <h1>You have successfully logged out.</h1>
    </>
  );
};

