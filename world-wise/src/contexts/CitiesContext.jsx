import {createContext, useCallback, useContext, useEffect, useReducer} from "react";


const BASE_URL = 'http://localhost:8004'

const CitiesContext = createContext(null)

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
}


function reducer(state, action) {

    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: action.payload}
        case 'cities/loaded':
            return { ...state, isLoading: false, cities: action.payload }
        case 'city/loaded':
            return { ...state, isLoading: false, currentCity: action.payload}
        case 'city/created':
            return { ...state, isLoading: false, cities: [...state.cities, action.payload]}
        case 'city/deleted':
            return { ...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload)}
        default:
            throw new Error ('Unknown action type')
    }
}


function CitiesProvider({ children }) {

    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        async function fetchCities() {
            try {
                dispatch({type: "loading", payload: true})

                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json()

                dispatch({ type: "cities/loaded", payload: data })
            }
            catch(err) {
                alert ('There was an error fetching data')

            } finally {
                dispatch({type: "loading", payload: false})
            }
        }
        fetchCities()
    }, [])


    const getCity = useCallback(async function getCity(id) {
        try {
            dispatch({type: "loading", payload: true})

            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()

            dispatch({type: "city/loaded", payload: data})
        }
        catch(err) {
            alert ('There was an error fetching city')
        }
        finally {
            dispatch({type: "loading", payload: false})
        }
    }, [])


    async function createCity(newCity) {
        try {
            dispatch({type: "loading", payload: true})

            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()

            dispatch({type: "city/created", payload: data})
        }
        catch(err) {
            alert ('There was an error creating a city')
        }
        finally {
            dispatch({type: "loading", payload: false})
        }
    }


    async function deleteCity(id) {
        try {
            dispatch({type: "loading", payload: true})

            await fetch(`${BASE_URL}/cities`, { method: 'POST' })

            dispatch({type: "city/deleted", payload: id})
        }
        catch(err) {
            alert ('There was an error deleting a city')
        }
        finally {
            dispatch({type: "loading", payload: false})
        }
    }


    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    )
}


function useCities() {
    const context = useContext(CitiesContext)

    if (!context) throw new Error('Cities context was used outside the CitiesProvider')

    return context
}


export { CitiesProvider, useCities }