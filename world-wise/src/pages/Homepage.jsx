import {NavLink} from "react-router-dom";

import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";


export default function Homepage() {
    return (
        <div>
            <PageNav/>
            <AppNav/>
            <h1>Worldwide</h1>
            <NavLink to="/app">Go to the app</NavLink>
        </div>
    )
}