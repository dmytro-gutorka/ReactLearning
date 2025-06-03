import { NavLink } from "react-router";

export default function Header() {

  return (
  <nav className="flex gap-10 items-center justify-center">
    <NavLink to="about">about</NavLink>
    <NavLink to="contacts">contacts</NavLink>
    <NavLink to="homepage">homepage</NavLink>
    <NavLink to="login">login</NavLink>
    <NavLink to="todo">todo</NavLink>
  </nav>
  )
}
