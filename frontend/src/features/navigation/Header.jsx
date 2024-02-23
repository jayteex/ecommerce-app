import { NavLink } from "react-router-dom";


export default function Header () {

  // Replace the 4 <a> tags with <NavLink> components
  return (
    <div className="header">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/sign-in">Sign In</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  )
}