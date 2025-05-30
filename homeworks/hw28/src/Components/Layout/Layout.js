import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { Outlet } from "react-router";
import { SmilesProvider } from "../../Contexts/SmilesContext";
import { ThemeProvider } from "../../Contexts/ThemeContext";


export default function Layout() {

  return (
    <>
      <ThemeProvider>
        <Header/>
          <SmilesProvider>
            <main>
              <Outlet/>
            </main>
          </SmilesProvider>
        <Footer/>
      </ThemeProvider>
    </>
  )
}

