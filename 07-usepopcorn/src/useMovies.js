import {useEffect, useState} from "react";


const KEY = 'd0e93483'


export function useMovies(query) {
    const [isLoading, setIsLoading] = useState(false)
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("")

    useEffect(function() {

        const controller = new AbortController();

        async function fetchMovies() {

            try {
                setIsLoading(true)
                setError('')

                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal})
                if (!res.ok) throw new Error('Something went wrong with fetching movies')

                const data = await res.json()
                if (data.Response === 'False') throw new Error('Movie was not found')

                setMovies(data.Search)
                setError('')
            }

            catch (err) {
                if (err.name !== 'AbortError') setError(err.message)
            }

            finally {
                setIsLoading(false)
            }
        }

        if (query.length < 3) {
            setMovies([])
            setError("")
            return;
        }

        fetchMovies();

        return () => controller.abort()

    }, [query])

    return {movies, isLoading, error}
}