import {createContext, useContext, useEffect, useState} from "react";


const BASE_URL = 'http://localhost:8004'

const CitiesContext = createContext(null)


function CitiesProvider({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true)

                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json()

                setCities(data)
            }
            catch(err) {
                alert ('There was an error fetching data')

            } finally {
                setIsLoading(false)
            }
        }
        fetchCities()
    }, [])

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading
        }}>
            {children}
        </CitiesContext.Provider>
    )
}


function useCities() {
    const context = useContext(CitiesContext)

    if(!context) throw new Error('Cities context was used outside the CitiesProvider')

    return context
}


export { CitiesProvider, useCities }