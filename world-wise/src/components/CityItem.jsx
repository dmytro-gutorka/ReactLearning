import styles from './CityItem.module.css'
import {Link} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext";


export default function Map({ city }) {

    const { cityName, emoji, date, position, id } = city
    const { currentCity, deleteCity } = useCities()

    const url = `${city.id}?lat=${position.lat}&lng=${position.lng}`
    const classes = `${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`

    function handleClick(e) {
        e.preventDefault()
        deleteCity(id)
    }

    return (
        <li >
            <Link className={classes} to={url}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{date}</time>
                <button onClick={handleClick} className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}