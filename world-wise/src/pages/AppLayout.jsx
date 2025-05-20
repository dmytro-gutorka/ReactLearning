import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import styles from './AppLayout.module.css'
import {Outlet} from "react-router-dom";


export default function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar/>
            <Map/>
        </div>
    )
}