// frontend/src/features/navigation/Header.jsx
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../signin/signInSlice.js"

export default function Header () {
  
  const user = useSelector(selectUser);

// Includes the nav bar with navigation links
  return (
    <div className="header">
      <NavLink to="/home">Home</NavLink>
      {!user && <NavLink to="/sign-in">Login</NavLink>}
      {user && <NavLink to="/account">Account</NavLink>}
      <NavLink to="/about">About</NavLink>
      {user && <NavLink to="/logout" ><i title="Logout" class="fa-solid fa-right-from-bracket"></i></NavLink>}
    </div>
  )
}