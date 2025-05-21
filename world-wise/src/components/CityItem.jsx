import styles from './CityItem.module.css'
import {Link} from "react-router-dom";


export default function Map({ city }) {

    const { cityName, emoji, date, position } = city

    return (
        <li >
            <Link className={styles.cityItem} to={`${city.id}?lan=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{date}</time>
            </Link>
        </li>
    )
}