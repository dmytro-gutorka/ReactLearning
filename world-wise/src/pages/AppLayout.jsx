import Sidebar from "../components/Sidebar";
import User from "../components/User";
import Map from "../components/Map";

import styles from './AppLayout.module.css'

import {useAuth} from "../contexts/FakeAuthContex";


export default function AppLayout() {

    const { user } = useAuth()

    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            {user && <User />}
        </div>
    )
}