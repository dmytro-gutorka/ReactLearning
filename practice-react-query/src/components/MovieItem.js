import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getMovieById } from "../services/todo";

export default function MovieItem() {

  const { id: movieID } = useParams()

  const queryClient = useQueryClient()

  const movie = useQuery({
    queryKey: ['movie', movieID],
    queryFn: () => getMovieById(movieID),
    initialData: () => {
      return queryClient.getQueryData(['movies'])?.pages[0].results.find(movie => movie.id === +movieID)
    },
    initialDataUpdatedAt: queryClient.getQueryState(['movies'])?.dataUpdatedAt,
    staleTime: 1000 * 5,
  })

  console.log(movie)

  return (
    <div>
      movie

    </div>
  )
}