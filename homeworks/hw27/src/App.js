import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import { SmilesProvider } from "./Contexts/SmilesContext";
import { ThemeProvider } from "./Contexts/ThemeContext";


function App() {

  return (
    <>
      <ThemeProvider>
        <Header />
        <SmilesProvider>
          <Main />
        </SmilesProvider>
        <Footer />
      </ThemeProvider>
    </>
  )
}


export default App;
