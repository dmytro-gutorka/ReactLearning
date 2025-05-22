import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from "./contexts/FakeAuthContex";

import PageNotFound from './pages/PageNotFound'
import CountryList from "./components/CountryList";
import AppLayout from './pages/AppLayout'
import CityList from "./components/CityList";
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Login from "./pages/Login";
import City from "./components/City";
import Form from "./components/Form";


export default function App() {

    return (
        <AuthProvider>
        <CitiesProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="/app" element={<AppLayout/>}>
                    <Route element={<Navigate to="cities" replace index/>}/>
                    <Route path='cities' element={<CityList/>}/>
                    <Route path="cities/:id" element={<City/>}/>
                    <Route path='countries' element={<CountryList/>}/>
                    <Route path="form" element={<Form/>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
        </CitiesProvider>
        </AuthProvider>
    )
}