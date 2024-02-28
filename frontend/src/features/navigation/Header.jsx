import { NavLink } from "react-router-dom";


export default function Header () {

// Includes the nav bar with navigation links
  return (
    <div className="header">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/sign-up">Sign Up</NavLink>
      <NavLink to="/sign-in">Sign In</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  )
}