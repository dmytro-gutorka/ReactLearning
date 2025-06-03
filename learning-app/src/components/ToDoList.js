import { useLoaderData } from "react-router";
import ToDoItem from "./ToDoItem";
import CreatePost from "./CreatePost";


export default function ToDoList() {
  const todos = useLoaderData()
  const limitedArr = todos.slice(0, 200)

  return (
    <div>
      <ul className="flex gap-3 flex-col">
        {limitedArr.map((todo, index) => (
          <ToDoItem todo={todo} key={index}/>
        ))}
      </ul>
      <CreatePost />
    </div>
  )
}