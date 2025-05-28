import { createContext, useContext, useEffect, useState } from "react";
import loadDataFromLocalStorage from "../utils/loadDataFromLocalStorage";
import saveDataToLocalStorage from "../utils/saveDataToLocalStorage";


const ThemeContext = createContext('light')


function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => loadDataFromLocalStorage('theme') || 'light')

  function handleTheme(theme) {
    setTheme(theme === 'light' ? 'dark' : 'light')

    saveDataToLocalStorage('theme', theme)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    saveDataToLocalStorage('theme', theme)
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, handleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}


function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('Theme context was used outside the ThemeProvider')

  return context
}

export { ThemeProvider, useTheme }