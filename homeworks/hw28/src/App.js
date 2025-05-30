import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Contacts from "./Pages/Contacts";
import Login from "./Pages/Login";
import { Navigate } from "react-router";


function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Homepage />}  />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}


export default App;

