import CreatePost from "./CreatePost";

import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodo, getTodos } from "../services/todo";
import ToDoItem from "./ToDoItem";


export default function ToDoList() {

  const { isPending, isError, error, data: postsIds } = useQuery({
    queryKey: ['posts'],
    queryFn: getTodos,
    select: (posts) => posts.map(post => post.id)
  })

  const allPosts = useQueries({
    queries: postsIds
      ? postsIds.map(id => {
        return {
          queryKey: ['post', id],
          queryFn: () => getTodo(id),
        }
      })
      : [],
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  const isLoadingPosts = allPosts.some(query => query.isLoading)
  const hasErrorPosts = allPosts.some(query => query.isLoading)

  if (isLoadingPosts) {
    return <p>Loading individual posts...</p>
  }

  if (hasErrorPosts) {
    return <p>Failed to load some posts</p>
  }

  const postsData = allPosts.map(query => query.data)


  return (
    <div>
        <ul className="flex gap-3 flex-col">
          {postsData.map((todo, index) => (<ToDoItem todo={todo} key={index}/>))}
        </ul>
      <CreatePost />
    </div>
  )
}