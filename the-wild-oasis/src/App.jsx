import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";


export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="dashboard" element={<Dashboard />}/>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="bookings" element={<Bookings />}/>
          <Route path="cabins" element={<Cabins />}/>
          <Route path="users" element={<Users />}/>
          <Route path="settings" element={<Users />}/>
          <Route path="account" element={<Account />}/>
          <Route path="login" element={<Login />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}