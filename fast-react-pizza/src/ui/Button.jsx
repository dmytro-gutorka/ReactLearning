import { Link } from "react-router-dom";


export default function Button({ children, disabled, to, type, onClick }) {

  const baseStyles =
    "bg-yellow-400 text-stone-800 uppercase font-semibold inline-block tracking-wide text-sm " +
    "rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none " +
    "focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed "

  const styles = {
    primary: baseStyles + " px-4 py-3 md:px-6 md:px-4",
    round: baseStyles + " px-5 py-1.5 md:px-3.5 md:px-3 text-sm",
    small: baseStyles + " px-4 py-2 md:px-5 md:px-2.5 text-xs",
    secondary: "px-4 py-2.5 md:px-6 md:px-3.5 bg-transparent border-2 border-stone-300 " +
      "text-stone-400 uppercase font-semibold inline-block tracking-wide " +
      "rounded-full hover:bg-stone-400 hover:text-stone-800 transition-colors duration-300 focus:outline-none " +
      "focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed "
  }

  if (to) return <Link to={to} className={styles[type]}>{children}</Link>

  if (onClick) return (
    <button className={styles[type]} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  )
}