import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../services/todo";

import toast from "react-hot-toast"


const toastOptions = {
  duration: 3000,
  position: "top-right",
  className: "item-deletion",
  removeDelay: 2000,
}


export default function ToDoItem({ todo }) {

  const queryClient = useQueryClient()

  const { id, title, views } = todo

  const mutation = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      toast(`Post '${id}' was deleted`, toastOptions)
      return queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  return (
    <div>
      <div className="flex gap-1">
        <span>{id}</span>
        <Link className="italic" to={`${id}`}>{title}</Link>
        <button onClick={() => mutation.mutate(id)} className="text-red-600">X</button>
      </div>
      <div>{views}</div>
    </div>
  )
}