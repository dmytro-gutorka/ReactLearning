import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from "./contexts/FakeAuthContex";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./pages/ProtectedRoute";
import CountryList from "./components/CountryList";
import CityList from "./components/CityList";
import Form from "./components/Form";
import City from "./components/City";
import SpinnerFullPage from "./components/SpinnerFullPage";


// import PageNotFound from './pages/PageNotFound'
// import AppLayout from './pages/AppLayout'
// import Homepage from './pages/Homepage'
// import Product from './pages/Product'
// import Pricing from './pages/Pricing'
// import Login from "./pages/Login";


const Homepage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Login = lazy(() => import('./pages/Login'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout'))


export default function App() {

    return (
        <AuthProvider>
        <CitiesProvider>
        <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="/app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                    <Route element={<Navigate to="cities" replace index/>}/>
                    <Route path='cities' element={<CityList/>}/>
                    <Route path="cities/:id" element={<City/>}/>
                    <Route path='countries' element={<CountryList/>}/>
                    <Route path="form" element={<Form/>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
            </Suspense>
        </BrowserRouter>
        </CitiesProvider>
        </AuthProvider>
    )
}