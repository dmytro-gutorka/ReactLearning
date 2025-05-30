import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { NavLink } from "react-router";

export default function Header() {

  return (
    <header className="flex justify-between bg-sky-200 p-6 mb-4 rounded-2xl">
    <ul className="flex items-center gap-5">
      <li>
        <NavLink to="/homepage">Homepage</NavLink>
      </li>
      <li>
        <NavLink to='/contacts'>Contacts</NavLink>
      </li>
      <li>
        <NavLink to="about">About us</NavLink>
      </li>
      <li>
        <NavLink to="login">Login</NavLink>
      </li>
    </ul>
      <ThemeSwitcher/>
    </header>
  )
}