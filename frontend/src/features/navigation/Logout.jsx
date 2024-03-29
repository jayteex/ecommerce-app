// frontend/src/features/navigation/Logout.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInRequest, signInSuccess } from "../signin/signInSlice";
import { signOutUserApi } from "../../api/signOut"; 
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Call the frontend signOut API function
        await signOutUserApi();
        // Dispatch actions to update the Redux store
        dispatch(signInRequest());
        dispatch(signInSuccess(null));
        //navigate("/"); // Navigate to the desired route after logout; commented out at the moment
      } catch (error) {
        // Handle error, if any
        console.error("Error logging out:", error);
      }
    };
    logoutUser();
  }, [dispatch, navigate]);

  return (
    <>
      <h1>You have successfully logged out.</h1>
    </>
  );
};




