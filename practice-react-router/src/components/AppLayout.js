import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";


export default function AppLayout({ children }) {

  return (
    <>
      <Header/>
        <Outlet/>
      <Footer/>
    </>
  )
}