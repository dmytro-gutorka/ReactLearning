import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

export default function Header() {

  return (
    <header className="flex justify-between bg-sky-200 p-6 mb-4 rounded-2xl">
    <ul className="flex items-center gap-5">
      <li>
        Homepage
      </li>
      <li>
        About us
      </li>
      <li>
        Contacts
      </li>
      <li>
        Login
      </li>
    </ul>
      <ThemeSwitcher/>
    </header>
  )
}