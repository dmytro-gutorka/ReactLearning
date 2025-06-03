import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../services/todo";


export default function ToDoDetails() {

  const { id: postId } = useParams()

  const { data, isPending } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getTodo(postId)
  })


  if (isPending) {
    return <p>Post loading....</p>
  }


  return (
    <div>
      <div className="flex gap-1">
        <span>{data.title}</span>
      </div>
      <div>{data.views}</div>
    </div>
  )
}