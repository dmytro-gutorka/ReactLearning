import { Link, useLoaderData, } from "react-router";


export default function ToDoItem({ todo }) {

  const todoById = useLoaderData()

  const { id, title, body } = todo || todoById

  return (
    <div>
      <div className="flex gap-1">
        <span>{id}</span>
        <Link className="italic" to={`${id}`}>{title}</Link>
      </div>
      <div>{body}</div>
    </div>
  )
}