import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import Login from "./pages/Login";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="app" element={<AppLayout/>}>
                    <Route index element={<p>index</p>}/>
                    <Route path='cities' element={<p>List of cities</p>}/>
                    <Route path='countries' element={<p>List of countries</p>}/>
                </Route>
                <Route path="form" element={<p>Form</p>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}