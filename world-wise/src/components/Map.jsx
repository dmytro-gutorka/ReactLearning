import styles from './Map.module.css'
import {useNavigate, useSearchParams} from "react-router-dom";


export default function Map() {

    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()

    const lat = searchParams.get('lan')
    const lng = searchParams.get('lng')

    return (
        <div className={styles.mapContainer} onClick={() => {navigate('form')}}>
            <h1>Map</h1>
            <h1>Position {lat} {lng}</h1>
            <button onClick={() => setSearchParams({lan: 20, lng: 10})}>Change position</button>
        </div>
    )
}