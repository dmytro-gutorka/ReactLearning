import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMoviesPerPage, getTodos } from "../services/todo";
import ToDoItem from "./ToDoItem";
import CreatePost from "./CreatePost";
import toast from "react-hot-toast";
import { useState } from "react";


export default function ToDoList() {

  const [page, setPage] = useState(1)

  const { isError, error, data, isPending, isPlaceholderData} = useQuery({
    queryKey: ['movies', page],
    queryFn: () => getMoviesPerPage(page),
    placeholderData: keepPreviousData,
  })

  if (isPending) {
    toast.loading('Loading...', { id: 'loading-toast' })
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  toast.dismiss('loading-toast')
  toast.success('Data has been loaded')

  return (
    <div>
      <div>
        {data.page}
        {data.results.map(movie => (
          <p key={movie.id}>{movie.title}</p>
        ))}
      </div>
      <div>
        <button onClick={() => setPage(page => page - 1)}>Prev Page</button>
        <span>{page}</span>
        <button onClick={() => setPage(page => page + 1)}>Next Page</button>
      </div>
    </div>
  )
}