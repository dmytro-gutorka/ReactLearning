import { useCities } from "../contexts/CitiesContext";

import styles from './CityList.module.css'

import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";


export default function CityList() {

    const { cities, isLoading } = useCities()

    console.log(cities)

    if (isLoading) return <Spinner/>
    if (!cities.length) return <Message message="Add your first city" />

    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem city={city} key={city.id}/>)}
        </ul>
    )
}