import styles from './CityItem.module.css'
import {Link} from "react-router-dom";


export default function Map({ city }) {
    const { cityName, emoji, date } = city

    return (
        <li >
            <Link className={styles.cityItem} to={`${city.id}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{date}</time>
            </Link>
        </li>
    )
}