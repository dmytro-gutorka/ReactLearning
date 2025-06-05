import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getMovieById } from "../services/todo";


export default function MovieItem() {

  const { id: movieID } = useParams()

  const queryClient = useQueryClient()

  const movie = useQuery({
    queryKey: ['movies', movieID],
    queryFn: () => getMovieById(movieID),
    initialData: () => {
      const state = queryClient.getQueryState(['movies'])

      if (state && Date.now() - state.dataUpdatedAt <= 20 * 1000) {
        console.log('Data from cache')
        return state?.data.pages[0].results.find(movie => movie.id === +movieID)
      }
    },

    initialDataUpdatedAt: queryClient.getQueryState(['movies'])?.dataUpdatedAt,
    staleTime: Infinity,
  })

  return (
    <div>
      <button
        onClick={() => queryClient.invalidateQueries({
          queryKey: ['movies'],
          exact: true
        })}
      >
        invalidate
      </button>
    </div>
  )
}

// form.reset()
