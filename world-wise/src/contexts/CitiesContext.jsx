import {createContext, useContext, useEffect, useState} from "react";


const BASE_URL = 'http://localhost:8004'

const CitiesContext = createContext(null)


function CitiesProvider({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})


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


    async function getCity(id) {
        try {
            setIsLoading(true)

            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()

            setCurrentCity(data)
        }
        catch(err) {
            alert ('There was an error fetching city')
        }
        finally {
            setIsLoading(false)
        }
    }


    async function createCity(newCity) {
        try {
            setIsLoading(true)

            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()

            setCities(cities => [...cities, data])
            setCurrentCity(data)
        }
        catch(err) {
            alert ('There was an error creating a city')
        }
        finally {
            setIsLoading(false)
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true)
            await fetch(`${BASE_URL}/cities`, { method: 'POST' })
            setCities(cities => cities.filter(city => city.id !== id))
        }
        catch(err) {
            alert ('There was an error deleting a city')
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity
        }}>
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