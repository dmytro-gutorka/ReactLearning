import styles from './CityItem.module.css'


export default function Map({ city }) {
    const { cityName, emoji, date } = city

    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{date}</time>
        </li>
    )
}