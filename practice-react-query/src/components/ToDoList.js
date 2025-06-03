import ToDoItem from "./ToDoItem";
import CreatePost from "./CreatePost";
import { useQuery } from "@tanstack/react-query";
import { getTodo, getTodos } from "../services/todo";


export default function ToDoList() {

  const { isPending, isError, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: getTodos,
  })

  const postId = data ? data[0]?.id : undefined

  const queryPerPost = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getTodo(postId),
    enabled: !!postId
  })


  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  console.log(1, queryPerPost)

  return (
    <div>
        <ul className="flex gap-3 flex-col">
          {data.map((todo, index) => (<ToDoItem todo={todo} key={index}/>))}
        </ul>
      <CreatePost />
    </div>
  )
}