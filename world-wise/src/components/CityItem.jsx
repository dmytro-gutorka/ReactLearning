import styles from './CityItem.module.css'
import {Link} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext";


export default function Map({ city }) {

    const { cityName, emoji, date, position, id } = city
    const { currentCity } = useCities()

    return (
        <li >
            <Link
                className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
                to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{date}</time>
            </Link>
        </li>
    )
}