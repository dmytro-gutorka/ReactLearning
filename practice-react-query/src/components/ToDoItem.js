import { Link } from "react-router";


export default function ToDoItem({ todo }) {

  const { id, title, views } = todo

  return (
    <div>
      <div className="flex gap-1">
        <span>{id}</span>
        <Link className="italic" to={`${id}`}>{title}</Link>
      </div>
      <div>{views}</div>
    </div>
  )
}