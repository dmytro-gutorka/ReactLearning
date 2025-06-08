import { useInfiniteQuery } from "@tanstack/react-query";
import { getMoviesPerPage } from "../services/todo";
import { Link } from "react-router";


export default function ToDoListInfiniteScroll() {

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: getMoviesPerPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    select: (data) => data.pages[0].results,
    retry: 2,
    staleTime: Infinity,
    initialDataUpdatedAt: Date.now()
  })

  if (status === 'pending') return (<p>Loading...</p>)
  if (status === 'error') return ( <p>{error.message}</p>)

  return (
    <div>
      <div>
        {data.page}
        {data.map(movie => (
            <p key={movie.id}>
              <Link to={`${movie.id}`}>{movie.title}</Link>
            </p>
          ))}
      </div>

      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage && 'Loading more...'}
          {hasNextPage? 'Load More': 'Nothing more to load'}
        </button>
      </div>

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  )
}


