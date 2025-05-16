import {useEffect, useRef, useState} from "react";
import StarRating from "./StarRating";
import {useMovies} from "./useMovies";
import {useLocalStorageState} from "./useLocalStorageState";
import {useKey} from "./useKey";


const KEY = 'd0e93483'


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)


export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null)

    const [watched, setWatched] = useLocalStorageState([], 'watched')
    const {movies, isLoading, error} = useMovies(query)

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => selectedId === id ? null : id)
    }

    function handleCloseMovie() {
        setSelectedId(null)
    }

    function handleAddWatched(movie) {
        setWatched(watched => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id))
    }

    return (
        <>
            <NavBar>
                <Logo />
                <Search query={query} setQuery={setQuery}/>
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList
                        movies={movies}
                        onSelectMovie={handleSelectMovie}
                    />}
                    {error && <ErrorMessage message={error}/>}

                </Box>
                <Box>
                    {selectedId
                        ? (
                            <MovieDetails
                                watched={watched}
                                selectedId={selectedId}
                                onCloseMovie={handleCloseMovie}
                                onAddWatched={handleAddWatched}
                            />
                        )
                        : (
                            <>
                            <WatchedSummary watched={watched}/>
                            <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}
                            />
                            </>
                        )}
                </Box>
            </Main>
        </>
  );
}


function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span>🛑 </span>
            {message}
        </p>
    )
}


function Loader() {
    return (
        <p className="loader">Loading...</p>
    )
}


function NavBar({ children }) {

  return (
    <nav className="nav-bar">
        {children}
    </nav>
  )
}


function Search({ query, setQuery }) {
    const inputEl = useRef(null);

    useKey('Enter', function() {
        if (document.activeElement === inputEl.current) return
        inputEl.current.focus()
        setQuery("")
    } )

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}


function Logo() {

    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    )
}


function NumResults({ movies }) {

    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}


function Main({ children }) {

  return (
      <main className="main">
          {children}
      </main>
  )
}


function Box({ children }) {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    )
}


function MovieList({ movies, onSelectMovie }) {

    return (
        <ul className="list list-movies">
            {movies?.map((movie, index) => (
                <Movie
                    movie={movie}
                    key={index}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    )
}


function Movie({ movie, onSelectMovie }) {

    return (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState('')

    const countRef = useRef(0);

    const isInWatchedList = watched.find(movie => movie.imdbID === selectedId)
    const watchedUserRating = isInWatchedList?.userRating

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie

    function handleAdd() {

        const newWatchedMovie = {
            imdbID: selectedId,
            imdbRating: +imdbRating,
            runtime: +runtime.split(' ').at(0),
            title,
            year,
            poster,
            userRating,
            countRatingDecisions: countRef.current
        }

        onAddWatched(newWatchedMovie)
        onCloseMovie(null)
    }

    useKey('Escape', onCloseMovie)

    useEffect(function() {
        if (userRating) countRef.current = countRef.current + 1;
    }, [userRating])

    useEffect(function() {
        if (!title) return
        document.title = `Movie | ${title}`
        return () => document.title = 'usePopcorn'
    }, [title])

    useEffect(function() {

        async function getMovieDetails() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
            const data = await res.json()

            setMovie(data)
            setIsLoading(false)
        }

        setIsLoading(true)
        getMovieDetails()

    }, [selectedId])

    return (
        <div className="details">
            {isLoading ? <Loader/> :
                (<>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        <img src={poster} alt={`Poster of ${title}`}/>
                        <div className='details-overview'>
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐️</span>{imdbRating} IMDb rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {isInWatchedList ? <p>You rated this movie ⭐️ {watchedUserRating} ⭐️ </p> : (
                                <>
                                    <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                                    {userRating > 0 && (<button className="btn-add" onClick={handleAdd}>Add to list</button>)}
                                </>
                            )}
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                    </>)}
        </div>
    )
}


function WatchedSummary({ watched }) {

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                </p>
            </div>
        </div>
    )
}


function WatchedMoviesList({ watched, onDeleteWatched }) {

    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} onDeleteWatched={onDeleteWatched} key={movie.imdbID}/>
                ))}
        </ul>
    )
}


function WatchedMovie({ movie, onDeleteWatched }) {

    return (
        <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
            </div>
        </li>
    )
}

